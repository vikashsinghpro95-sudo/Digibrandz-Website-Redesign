<?php
/**
 * TursoClient — PDO-like wrapper for Turso (libSQL) HTTP Pipeline API.
 */

class TursoResult {
    public array $cols = [];
    public array $rows = [];
    public int $affected_rows = 0;
    private int $position = 0;

    public function fetchAll($mode = null): array {
        $out = [];
        foreach ($this->rows as $row) {
            $assoc = [];
            foreach ($this->cols as $i => $col) {
                $assoc[$col['name']] = $row[$i]['value'] ?? null;
            }
            $out[] = $assoc;
        }
        return $out;
    }

    public function fetch($mode = null) {
        if ($this->position >= count($this->rows)) return false;
        $assoc = [];
        foreach ($this->cols as $i => $col) {
            $assoc[$col['name']] = $this->rows[$this->position][$i]['value'] ?? null;
        }
        $this->position++;
        return $assoc;
    }

    public function fetchColumn(int $index = 0) {
        if (empty($this->rows)) return false;
        return $this->rows[0][$index]['value'] ?? null;
    }

    public function rowCount(): int {
        return $this->affected_rows;
    }
}

class TursoStatement {
    private TursoClient $client;
    private string $sql;
    private array $args = [];

    public function __construct(TursoClient $client, string $sql) {
        $this->client = $client;
        $this->sql = $sql;
    }

    public function execute(array $args = []): TursoResult {
        $this->args = $args;
        return $this->client->execute($this->sql, $args);
    }

    public function fetchAll($mode = null): array {
        return $this->client->execute($this->sql, $this->args)->fetchAll();
    }

    public function fetch($mode = null) {
        return $this->client->execute($this->sql, $this->args)->fetch();
    }

    public function fetchColumn(int $index = 0) {
        return $this->client->execute($this->sql, $this->args)->fetchColumn($index);
    }
}

class TursoClient {
    private string $pipelineUrl;
    private string $token;
    private string $lastInsertId = '0';

    public function __construct(string $url, string $token) {
        $url = preg_replace('#^libsql://#', 'https://', $url);
        $this->pipelineUrl = rtrim($url, '/') . '/v2/pipeline';
        $this->token = $token;
    }

    public function setAttribute($key, $value): bool {
        return true;
    }
    
    public function lastInsertId(): string {
        return $this->lastInsertId;
    }

    private function encodeArg($value): array {
        if ($value === null)              return ['type' => 'null'];
        if (is_bool($value))              return ['type' => 'integer', 'value' => $value ? '1' : '0'];
        if (is_int($value))               return ['type' => 'integer', 'value' => (string) $value];
        if (is_float($value))             return ['type' => 'float',   'value' => $value];
        return ['type' => 'text', 'value' => (string) $value];
    }

    public function execute(string $sql, array $args = []): TursoResult {
        $encodedArgs = array_map([$this, 'encodeArg'], array_values($args));

        $stmt = [
            'sql'       => $sql,
            'want_rows' => true,
        ];
        if (!empty($encodedArgs)) {
            $stmt['args'] = $encodedArgs;
        }

        $body = [
            'requests' => [
                ['type' => 'execute', 'stmt' => $stmt],
                ['type' => 'close'],
            ],
        ];

        $ch = curl_init($this->pipelineUrl);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_HTTPHEADER     => [
                'Authorization: Bearer ' . $this->token,
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS     => json_encode($body),
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlErr  = curl_error($ch);
        curl_close($ch);

        if ($curlErr) {
            throw new RuntimeException('Turso connection error: ' . $curlErr);
        }
        if ($httpCode >= 400) {
            throw new RuntimeException("Turso HTTP $httpCode: $response");
        }

        $data = json_decode($response, true);
        if (!isset($data['results'][0])) {
            throw new RuntimeException('Invalid Turso response: ' . $response);
        }

        $first = $data['results'][0];
        if (($first['type'] ?? '') !== 'ok') {
            throw new RuntimeException('Turso query error: ' . json_encode($first));
        }

        $res = new TursoResult();
        $execResp = $first['response']['result'] ?? [];
        $res->cols          = $execResp['cols'] ?? [];
        $res->rows          = $execResp['rows'] ?? [];
        $res->affected_rows = (int) ($execResp['affected_row_count'] ?? 0);
        if (isset($execResp['last_insert_rowid'])) {
            $this->lastInsertId = (string) $execResp['last_insert_rowid'];
        }
        return $res;
    }

    public function exec(string $sql): TursoResult {
        return $this->execute($sql);
    }

    public function query(string $sql, array $args = []): TursoResult {
        return $this->execute($sql, $args);
    }

    public function prepare(string $sql): TursoStatement {
        return new TursoStatement($this, $sql);
    }
}

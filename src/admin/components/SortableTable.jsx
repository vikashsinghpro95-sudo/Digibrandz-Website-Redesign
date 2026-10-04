import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 1 : 0,
    position: 'relative'
  };

  return (
    <tr ref={setNodeRef} style={style} className="bg-white hover:bg-zinc-50">
      <td className="px-4 py-4 w-10 border-b border-zinc-100">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-600">
          <GripVertical size={20} />
        </div>
      </td>
      {children}
    </tr>
  );
}

export default function SortableTable({ items, onReorder, columns, renderRow }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-4 py-3 w-10"></th>
              {columns.map((col, i) => (
                <th key={i} className={`px-6 py-3 ${col.className || ''}`}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  {renderRow(item)}
                </SortableItem>
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}

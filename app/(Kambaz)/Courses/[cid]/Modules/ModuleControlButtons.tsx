import { IoEllipsisVertical } from "react-icons/io5"; // Ellipsis icon
import { BsPlusCircle } from "react-icons/bs"; // Plus icon
import GreenCheckmark from "./GreenCheckmark"; // Green checkmark icon
import { FaTrash } from "react-icons/fa"; // Trash icon
import { FaPencil } from "react-icons/fa6"; // Pencil icon

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  saveModule,
  isEditing,
}: {
  moduleId: string;
  deleteModule: (id: string) => void;
  editModule: (id: string) => void;
  saveModule: (id: string) => void;
  isEditing: boolean;
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
         style={{ cursor: "pointer" }}
      />

      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
         style={{ cursor: "pointer" }}
      />

       {/* Clickable wrapper for green checkmark */}
      <span
        onClick={isEditing ? () => saveModule(moduleId) : undefined}
        style={{ cursor: isEditing ? "pointer" : "default" }}
      >
        <GreenCheckmark />
      </span>

      <BsPlusCircle className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

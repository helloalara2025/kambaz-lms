/*******************************************
 * Course Home Page - Alara Hakki
 * 
 * This is my modules display page.
 * Faculty can add, edit, and delete modules.
 * Students can only view modules.
 * Changes persist in MongoDB database.
 *******************************************/
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { RootState } from "../../../store";
import { setModules, addModule, updateModule, deleteModule } from "../Modules/reducer";
import * as client from "../../client";

export default function Home() {
  /* I get course ID from URL params */
  const { cid } = useParams();
  const dispatch = useDispatch();

  /* I get current user and modules from Redux store */
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  /* State for new module name and which module is being edited */
  const [moduleName, setModuleName] = useState("");
  const [editingId, setEditingId] = useState("");

  /* Only faculty and admin can modify modules */
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  /* I fetch modules from backend when course ID changes */
  const fetchModules = async () => {
    if (cid) {
      const data = await client.findModulesForCourse(cid as string);
      dispatch(setModules(data));
    }
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  /* I handle adding a new module */
  const handleAdd = async () => {
    if (!moduleName.trim()) return;
    const newModule = await client.createModuleForCourse(cid as string, {
      name: moduleName,
      course: cid,
      lessons: []
    });
    dispatch(addModule(newModule));
    setModuleName("");
  };

  /* I handle deleting a module - this was missing before! */
  const handleDelete = async (moduleId: string) => {
    await client.deleteModule(cid as string, moduleId);
    dispatch(deleteModule(moduleId));
  };

  /* I handle updating a module - changes persist in database */
  const handleUpdate = async (module: any) => {
    await client.updateModule(cid as string, module);
    dispatch(updateModule(module));
    setEditingId("");
  };

  return (
    <div id="wd-home">
      <h3>Modules</h3>

      {/* Only faculty sees the add module form */}
      {isFaculty && (
        <div className="d-flex mb-3">
          <input
            className="form-control me-2"
            placeholder="Module Name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button className="btn btn-danger" onClick={handleAdd}>
            <FaPlus /> Module
          </button>
        </div>
      )}

      {/* I render list of modules */}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-4 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />

              {/* I show input when editing, otherwise show module name */}
              {editingId === module._id ? (
                <input
                  className="form-control d-inline-block w-50"
                  value={module.name}
                  onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate(module)}
                  onBlur={() => handleUpdate(module)}
                  autoFocus
                />
              ) : (
                <span>{module.name}</span>
              )}

              {/* Only faculty sees edit and delete buttons */}
              {isFaculty && (
                <span className="float-end">
                  <FaPencil
                    className="text-primary me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setEditingId(module._id)}
                  />
                  <FaTrash
                    className="text-danger me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(module._id)}
                  />
                  <FaCheckCircle className="text-success me-2" />
                  <IoEllipsisVertical />
                </span>
              )}
            </div>

            {/* I render lessons inside each module */}
            {module.lessons?.map((lesson: any, idx: number) => (
              <div key={idx} className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />{lesson.name}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
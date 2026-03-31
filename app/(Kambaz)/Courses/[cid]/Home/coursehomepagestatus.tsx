// This is the course home page status file. 
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { IoAnalyticsSharp } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineViewStream } from "react-icons/md";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>
      
      Unpublish/Publish buttons side by side
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button variant="success" size="lg" className="w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>
      
      <br />
      
      {/* Rest of the buttons */}
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>
      
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>
      
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <AiOutlineHome className="me-2 fs-5" /> Choose Home Page
      </Button>
      
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <MdOutlineViewStream className="me-2 fs-5" /> View Course Stream
      </Button>
      
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" /> New Announcements
      </Button>
      
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoMdNotifications className="me-2 fs-5" /> View Course Notifications
      </Button>
      
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoAnalyticsSharp className="me-2 fs-5" /> New Analytics
      </Button>
    </div>
  );
}
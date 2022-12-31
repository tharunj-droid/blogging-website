import React from "react";
import Edit from "D:/Tharun/projects/blog webb/client/src/imgs/edit.png";
import Delete from "D:/Tharun/projects/blog webb/client/src/imgs/delete.png";
import {Link} from 'react-router-dom';
import {Menu} from "../components/Menu";

export const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src="https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <div className="user">
          <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
          <div className="info">
            <span>Tharun</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={"./write?edit=2"}>
              <img src={Edit} alt="edit logo" />
            </Link>

            <img src={Delete} alt="Delete logo" />
          </div>
        </div>
        <h1>Loreum lowda</h1>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </p>
      </div>
      <Menu/>
    </div>
  );
};

export default Single;

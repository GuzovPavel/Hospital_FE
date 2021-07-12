import React, { useState } from "react";
import { Button } from "@material-ui/core";
import TaskBar from "./TaskBar/TaskBar";
import Title from "./Title";
import { useHistory } from "react-router-dom";
import TableOfVisit from "./TableOfVisit";

const HomePage = () => {
  const [visits, setVisits] = useState([]);

  const route = useHistory();

  const onClickLoguot = () => {
    localStorage.clear();
    route.push("/login");
  };

  return (
    <div>
      <header>
        <Title>
          <span>Приемы</span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClickLoguot()}
          >
            <span>Выйти</span>
          </Button>
        </Title>
      </header>
      <TaskBar visits={visits} setVisits={setVisits} />
      <TableOfVisit visits={visits} setVisits={setVisits} />
    </div>
  );
};

export default HomePage;

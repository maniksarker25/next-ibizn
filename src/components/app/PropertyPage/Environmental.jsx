import React, { useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";

const Environmental = ({ items }) => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel :'');
  };

  return (
    <div>
      <h1 className="text-3xl text-[#0080ff] font-light md:text-6xl md:font-light md:py-4">
        Environmental
      </h1>
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className="border-t border-[#0080ff] w-full md:w-full"
        >
          <AccordionSummary
            expandIcon={
              <AddCircleRoundedIcon className="md:text-[#3a95ea] text-[#3a95ea] md:text-5xl" />
            }
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
            className="md:bg-gray-100 flex-row-reverse md:flex-row-reverse"
          >
            <Typography className="md:text-[#0080ff] md:text-2xl md:font-extralight md:py-4 text-[#3a95ea]">
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography  className="md:text-black md:text-lg">
              {item.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Environmental;

import React, { useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";

const Environmental = ({ items }) => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : "");
  };

  return (
    <div>
      <h1 className="text-3xl mb-6 text-[#0080ff] font-light md:text-6xl md:font-light md:py-4 font-outfit">
        Environmental
      </h1>
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className="border-t border-[#00afff] w-full md:w-full font-outfit"
          sx={{ borderRadius: 0, backgroundColor: "#F1F2F2" }}
        >
          <AccordionSummary
            expandIcon={
              <AddCircleRoundedIcon className="md:text-[#3a95ea] text-[#3a95ea] md:text-5xl " />
            }
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
            className="bg-[#F1F2F2] flex-row-reverse md:flex-row-reverse"
            sx={{ borderRadius: 0 }}
          >
            <Typography className="font-outfit md:text-2xl md:font-extralight md:py-4 text-[#3a95ea]">
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-[#2f2f30] md:text-lg bg-[#F1F2F2] font-outfit">
              {item.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Environmental;

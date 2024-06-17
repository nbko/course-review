import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function DisabledAccordion() {
	return (
		<>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					<Stack direction="row">
						<Typography>CMSC 14100 3</Typography>
						<Chip label="Autumn 2022" />
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					<div>Comments on the course</div>
					<Typography>
						The course was challenging but fair, with a significant emphasis on
						'code quality' which was difficult for beginners to grasp. The
						grading scheme was clear, but some found it harsh and the exams
						could be stressful. The course was generally found to be difficult,
						especially for those without prior experience in coding.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<div>Course Content</div>
					<Typography>
						Students learned fundamental concepts of programming in Python,
						including data types, conditionals, loops, classes, recursion, and
						exception handling. The course also covered data structures and
						algorithms, which were essential for future CS courses. Practical
						skills in Linux command line and Python coding etiquette were also
						taught.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<div>Comments on the professor</div>
					<Typography>
						Professor Elmore was praised for his engaging and informative
						lectures, his ability to answer questions effectively, and his
						approachable demeanor. He was noted for making complex topics
						understandable and for being a great lecturer overall. His use of
						live coding examples in lectures was particularly appreciated.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<div>Advice</div>
					<Typography>
						Students recommended more examples and exposure to 'code quality'
						concepts, better instructions on homework, and improvements to the
						office hour system. They also suggested that lectures could slow
						down a bit and provide more notes or slides for better
						comprehension. Optional discussion sections could help accommodate
						different levels of comfort with the material.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2-content"
					id="panel2-header"
				>
					<Stack direction="row">
						<Typography>CMSC 14100 3</Typography>
						<Chip label="Winter 2021" />
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						The course was challenging but fair, with a significant emphasis on
						'code quality' which was difficult for beginners to grasp. The
						grading scheme was clear, but some found it harsh and the exams
						could be stressful. The course was generally found to be difficult,
						especially for those without prior experience in coding.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students learned fundamental concepts of programming in Python,
						including data types, conditionals, loops, classes, recursion, and
						exception handling. The course also covered data structures and
						algorithms, which were essential for future CS courses. Practical
						skills in Linux command line and Python coding etiquette were also
						taught.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Professor Elmore was praised for his engaging and informative
						lectures, his ability to answer questions effectively, and his
						approachable demeanor. He was noted for making complex topics
						understandable and for being a great lecturer overall. His use of
						live coding examples in lectures was particularly appreciated.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students recommended more examples and exposure to 'code quality'
						concepts, better instructions on homework, and improvements to the
						office hour system. They also suggested that lectures could slow
						down a bit and provide more notes or slides for better
						comprehension. Optional discussion sections could help accommodate
						different levels of comfort with the material.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3-content"
					id="panel3-header"
				>
					<Stack direction="row">
						<Typography>CMSC 14100 1</Typography>
						<Chip label="Winter 2021" />
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						The course was challenging but fair, with a significant emphasis on
						'code quality' which was difficult for beginners to grasp. The
						grading scheme was clear, but some found it harsh and the exams
						could be stressful. The course was generally found to be difficult,
						especially for those without prior experience in coding.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students learned fundamental concepts of programming in Python,
						including data types, conditionals, loops, classes, recursion, and
						exception handling. The course also covered data structures and
						algorithms, which were essential for future CS courses. Practical
						skills in Linux command line and Python coding etiquette were also
						taught.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Professor Elmore was praised for his engaging and informative
						lectures, his ability to answer questions effectively, and his
						approachable demeanor. He was noted for making complex topics
						understandable and for being a great lecturer overall. His use of
						live coding examples in lectures was particularly appreciated.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students recommended more examples and exposure to 'code quality'
						concepts, better instructions on homework, and improvements to the
						office hour system. They also suggested that lectures could slow
						down a bit and provide more notes or slides for better
						comprehension. Optional discussion sections could help accommodate
						different levels of comfort with the material.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel4-content"
					id="panel4-header"
				>
					<Stack direction="row">
						<Typography>CMSC 14100 8</Typography>
						<Chip label="Winter 2021" />
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						The course was challenging but fair, with a significant emphasis on
						'code quality' which was difficult for beginners to grasp. The
						grading scheme was clear, but some found it harsh and the exams
						could be stressful. The course was generally found to be difficult,
						especially for those without prior experience in coding.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students learned fundamental concepts of programming in Python,
						including data types, conditionals, loops, classes, recursion, and
						exception handling. The course also covered data structures and
						algorithms, which were essential for future CS courses. Practical
						skills in Linux command line and Python coding etiquette were also
						taught.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Professor Elmore was praised for his engaging and informative
						lectures, his ability to answer questions effectively, and his
						approachable demeanor. He was noted for making complex topics
						understandable and for being a great lecturer overall. His use of
						live coding examples in lectures was particularly appreciated.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students recommended more examples and exposure to 'code quality'
						concepts, better instructions on homework, and improvements to the
						office hour system. They also suggested that lectures could slow
						down a bit and provide more notes or slides for better
						comprehension. Optional discussion sections could help accommodate
						different levels of comfort with the material.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel5-content"
					id="panel5-header"
				>
					<Stack direction="row">
						<Typography>CMSC 14100 5</Typography>
						<Chip label="Winter 2021" />
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						The course was challenging but fair, with a significant emphasis on
						'code quality' which was difficult for beginners to grasp. The
						grading scheme was clear, but some found it harsh and the exams
						could be stressful. The course was generally found to be difficult,
						especially for those without prior experience in coding.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students learned fundamental concepts of programming in Python,
						including data types, conditionals, loops, classes, recursion, and
						exception handling. The course also covered data structures and
						algorithms, which were essential for future CS courses. Practical
						skills in Linux command line and Python coding etiquette were also
						taught.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Professor Elmore was praised for his engaging and informative
						lectures, his ability to answer questions effectively, and his
						approachable demeanor. He was noted for making complex topics
						understandable and for being a great lecturer overall. His use of
						live coding examples in lectures was particularly appreciated.
					</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<Typography>
						Students recommended more examples and exposure to 'code quality'
						concepts, better instructions on homework, and improvements to the
						office hour system. They also suggested that lectures could slow
						down a bit and provide more notes or slides for better
						comprehension. Optional discussion sections could help accommodate
						different levels of comfort with the material.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion disabled>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel6-content"
					id="panel6-header"
				>
					<Typography>Disabled Accordion</Typography>
				</AccordionSummary>
			</Accordion>
		</>
	);
}

import React, {useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioGroupItem({items, label, index, answer, updateAnswer, answers, rules, latestAnswer, previousAnswer}) 
{
	function handleChange(e) 
	{
		// console.log(e.target.value, index);
		updateAnswer(e.target.value, index);
	}

	useEffect(() => {
		// console.log('previous_answer', previousAnswer, index)
		if(previousAnswer === null) {
			updateAnswer(null, index)
		}

		answers.map((a) => {
			const rule = rules[a];
			// const rule = previousAnswer.some(r => rules.includes(r));
			if(typeof rule !== "undefined") {
				if(rule.includes(parseInt(answer))) {
					updateAnswer(null, index)
				}
			}
		});
		
	}, [previousAnswer]);
	
	

	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<RadioGroup aria-labelledby="demo-radio-buttons-group-label" onChange={handleChange} value={answer}>
			{
				items.map((item) => {
					let in_rule = false;
					if(index > 0) {
						// answers.map((a) => {
						// 	const rule = rules[a];
						// 	// const rule = previousAnswer.some(r => rules.includes(r));
						// 	if(typeof rule !== "undefined") {
						// 		in_rule = rule.includes(parseInt(item.id))
						// 		if(in_rule) {
						// 			break;
						// 		}
						// 		// console.log('in_rule', in_rule);
						// 	}
						// });
						const has_rule = answers.filter((a) => {
							const rule = rules[a];
							if(typeof rule !== "undefined") {
								return rule.includes(parseInt(item.id))
							}
						})
						in_rule = has_rule.length > 0;
						console.log(has_rule, in_rule);
					}
					// console.log(previousAnswer, item.value, in_rule);
					return <FormControlLabel value={item.id} control={<Radio />} label={item.value} key={item.id} disabled={(previousAnswer === null && index > 0) || in_rule} />
				})
			}
			</RadioGroup>
		</FormControl>
	);
}
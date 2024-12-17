import { useState } from 'react';

const Button = ({ text, fn }) => {
	const [count, setCount] = useState(0);

	const handleClick = () => {
		setCount(count + 1);
		fn(count);
	};

	return <button onClick={() => handleClick()}>{text}</button>;
};

export default Button;

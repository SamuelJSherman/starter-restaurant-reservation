import React from "react";
import { useHistory } from "react-router-dom";

export default function SeatReservation({ tables }) {
	if(!tables) return null;

	const history = useHistory();

	function handleSubmit(event) {
		event.preventDefault();

		const foundErrors = [];

		if(validateFields(foundErrors) && validateDate(foundErrors)) {
			history.push(`/dashboard?date=${formData.reservation_date}`);
		}

		setErrors(foundErrors);
	}

	const tableOptionsJSX = () => {
		return tables.map((table) => 
			<option value={table.table_id}>{table.table_name} - {table.capacity}</option>);
	};

	return (
		<form>
			<label htmlFor="table_id">Choose table:</label>
			<select name="table_id" id="table_id">
				{tableOptionsJSX()}
			</select>

			<button type="submit" onClick={handleSubmit}>Submit</button>
			<button type="button" onClick={history.goBack}>Cancel</button>
		</form>
	);
}
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservation({ edit, reservations }) {
	const history = useHistory();
	const { reservation_id } = useParams();

	const [errors, setErrors] = useState([]);
	const [formData, setFormData] = useState({
		// initial (default) data
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: 1,
	});

	if(edit) {
		if(!reservations || !reservation_id) return null;

		const foundReservation = reservations.find((reservation) => 
			reservation.reservation_id === Number(reservation_id));

		if(!foundReservation || foundReservation.status !== "booked") {
			return <p>Only booked reservations can be edited.</p>;
		}

		setFormData({
			first_name: foundReservation.first_name,
			last_name: foundReservation.last_name,
			mobile_number: foundReservation.mobile_number,
			reservation_date: foundReservation.reservation_date,
			reservation_time: foundReservation.reservation_time,
			people: foundReservation.people,
			reservation_id: foundReservation.reservation_id,
		});
	}

	function handleChange({ target }) {
		setFormData({ ...formData, [target.name]: target.value });
	}
	function handleSubmit(event) {
		event.preventDefault();
		const foundErrors = [];
		if(validateFields(foundErrors) && validateDate(foundErrors)) {
			history.push(`/dashboard?date=${formData.reservation_date}`);
		}
		setErrors(foundErrors);
	}
	function validateFields(foundErrors) {
		for(const field in formData) {
			if(formData[field] === "") {
				foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
			}
		}

		return foundErrors.length === 0;
	}

	function validateDate(foundErrors) {
		const reserveDate = new Date(`${formData.reservation_date}T${formData.reservation_time}:00.000`);
		const todaysDate = new Date();
		if(reserveDate.getDay() === 2) {  
			foundErrors.push({ message: "Reservation cannot be made: Restaurant is closed on Tuesdays." });
		}
		if(reserveDate < todaysDate) {
			foundErrors.push({ message: "Reservation cannot be made: Date is in the past." });
		}
		if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
			foundErrors.push({ message: "Reservation cannot be made: Restaurant is not open until 10:30AM." });
		}
		else if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
			foundErrors.push({ message: "Reservation cannot be made: Restaurant is closed after 10:30PM." });
		}
		else if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
			foundErrors.push({ message: "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM)." })
		}

		return foundErrors.length === 0;
	}

	const errorsJSX = () => {
		return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
	};
	return (
		<form>
			{errorsJSX()}
			<label htmlFor="first_name">First Name:&nbsp;</label>
			<input 
				name="first_name"
				id="first_name"
				type="text"
				onChange={handleChange}
				value={formData.first_name}
				required
			/>
			<label htmlFor="last_name">Last Name:&nbsp;</label>
			<input 
				name="last_name"
				id="last_name"
				type="text"
				onChange={handleChange}
				value={formData.last_name}
				required
			/>
			<label htmlFor="mobile_number">Mobile Number:&nbsp;</label>
			<input 
				name="mobile_number"
				id="mobile_number"
				type="tel"
				onChange={handleChange}
				value={formData.mobile_number}
				required
			/>
			<label htmlFor="reservation_date">Reservation Date:&nbsp;</label>
			<input 
				name="reservation_date" 
				id="reservation_date"
				type="date"
				onChange={handleChange}
				value={formData.reservation_date}
				required
			/>
			<label htmlFor="reservation_time">Reservation Time:&nbsp;</label>
			<input 
				name="reservation_time" 
				id="reservation_time"
				type="time"
				onChange={handleChange}
				value={formData.reservation_time}
				required
			/>
			<label htmlFor="people">Party Size:&nbsp;</label>
			<input 
				name="people"
				id="people"
				type="number"
				min="1"
				onChange={handleChange}
				value={formData.people}
				required
			/>
			<button type="submit" onClick={handleSubmit}>Submit</button>
			<button type="button" onClick={history.goBack}>Cancel</button>
		</form>
	);
}
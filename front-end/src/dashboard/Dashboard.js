import React from "react";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationRow from "./ReservationRow";
import TableRow from "./TableRow";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, reservationsError, tables, tablesError }) {
	const history = useHistory();

	const reservationsJSX = () => {
		return reservations.map((reservation) => 
			<ReservationRow key={reservation.reservation_id} reservation={reservation} />);
	};
	const tablesJSX = () => {
		return tables.map((table) => 
			<TableRow key={table.table_id} table={table} />);
	};
  return (
    <main>
      <h1>Dashboard</h1>
      <h4 className="mb-0">Reservations for {date}</h4>
			
			<ErrorAlert error={reservationsError} />
			<table class="table">
				<thead class="thead-light">
					<tr>
						<th scope="col">ID</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Mobile Number</th>
						<th scope="col">Time</th>
						<th scope="col">People</th>
						<th scope="col">Status</th>
						<th scope="col">Edit</th>
						<th scope="col">Cancel</th>
						<th scope="col">Seat</th>
					</tr>
				</thead>

				<tbody>
					{reservationsJSX()}
				</tbody>
			</table>
      
			<h4 className="mb-0">Tables</h4>
			<ErrorAlert error={tablesError} />
			<table class="table">
				<thead class="thead-light">
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Table Name</th>
						<th scope="col">Capacity</th>
						<th scope="col">Status</th>
						<th scope="col">Finish</th>
					</tr>
				</thead>

				<tbody>
					{tablesJSX()}
				</tbody>
			</table>
			<button type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
			<button type="button" onClick={() => history.push(`/dashboard`)}>Today</button>
			<button type="button" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
    </main>
  );
}
export default Dashboard;
import { useState } from "react";

export default function EtaSelector() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        // <p>t</p>
        <input className="styledInput" type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />

    )
}
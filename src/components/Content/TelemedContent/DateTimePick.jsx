import React, { useState } from "react";
import date from "date-and-time";
import DateTimePicker from 'react-datetime-picker';
// import DateTimeField from "react-bootstrap-datetimepicker";
import { DateTime } from 'react-datetime-bootstrap';

const DateTimePick = () => {
   const [value, onChange] = useState(new Date());
   return (
      <div className="App">
         <div>
            <DateTime />
            <h4>Provide a value</h4>
            <DateTime value="2017-04-20" />
            <h4>Format (See momentjs for available formats)</h4>
            <DateTime pickerOptions={{ format: "LL" }} value="2017-04-20" />
            <h4>Time Only</h4>
            <DateTime pickerOptions={{ format: "LTS" }} />
         </div>
         <div>
            <DateTimePicker
               onChange={onChange}
               value={value}
            />
         </div>
      </div>
   );
}

export default DateTimePick;
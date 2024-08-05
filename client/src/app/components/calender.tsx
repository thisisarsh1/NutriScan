// import React from "react";

// import { DayPicker } from "react-day-picker";

// export function MyDatePicker() {
//   const [selected, setSelected] = React.useState<Date>();
//   return (
//     <DayPicker
//       mode="single"
//       onSelect={setSelected}
//       selected={selected}
//       components={{
//         DayButton: (props) => {
//           const { day, modifiers, ...buttonProps } = props;
//           return (
//             <button
//               {...buttonProps}
//               // Prevent the default click event
//               onClick={() => setSelected(undefined)}
//               // Handle the double click event and reset the selection
//               onDoubleClick={() => setSelected(day.date)}
//             />
//           );
//         }
//       }}
//       footer={selected?.toDateString() || "Double click to select a date"}
//     />
//   );
// }
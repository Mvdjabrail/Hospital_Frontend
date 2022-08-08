// import './style.css';
// import {
//   CardHolder,
//   CardNumber,
//   CardSecurityCode,
//   ValidThruMonth,
//   ValidThruYear,
// } from 'reactjs-credit-card/form';
// import Card from 'reactjs-credit-card/card';
// import { cardForm } from 'reactjs-credit-card'; //import the HOC
// import { useState } from 'react';

// function App({ getCardForm }) {
//   const [numberValid, setNumberValid] = useState(true);
//   //we can get getCardForm property like hook usage after wrap the App component with HOC
//   function handleSubmit(e) {
//     const [data, isValid] = getCardForm();
//     e.preventDefault();
//     console.log(data, isValid); //log all form data and verification results

//     if (!data.number.isValid) setNumberValid(false); //we'll set a hook to show a error if card number is invalid
//     //check the general verification result and alert with special verification result
//     if (!isValid)
//       alert(
//         `${data.holder.value} form data values invalid :) and holder also ${
//           data.holder.isValid ? 'valid' : 'invalid'
//         }`
//       );
//   }

//   //remove error function if focused on CardNumber
//   function handleFocus() {
//     setNumberValid(true);
//   }

//   return (
//     <div className="container">
//       <div className="form-box">
//         <form onSubmit={handleSubmit}>
//           //If numberValid state is false then show a error
//           <CardNumber
//             placeholder="Card Number"
//             className={`input-text${!numberValid ? ' error' : ''}`}
//             onFocus={handleFocus}
//           />
//           <CardHolder placeholder="Card Holder" className="input-text" />
//           <div className="flex-wrapper">
//             <div className="semi flex-wrapper">
//               <ValidThruMonth className="input-text semi" />
//               <ValidThruYear className="input-text semi" />
//             </div>
//             <CardSecurityCode placeholder="CVV" className="input-text semi" />
//           </div>
//           <button className="btn">Submit</button>
//         </form>
//       </div>
//       //fixClass property is used to change all card components sizes by changing
//       font-size //default fonts-size 11px.
//       <Card fixClass="fix-new" cardClass="card-new" />
//     </div>
//   );
// }
// export default cardForm(App); //wrap with hoc
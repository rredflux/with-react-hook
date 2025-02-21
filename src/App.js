	import './App.css';
	import {ReactComponent as Logo} from './images/dollar_sign.svg';
	import {useForm} from 'react-hook-form';

	import { initializeApp } from "firebase/app";
	import{ getDocs, collection, getFirestore, addDoc} from "firebase/firestore";
	// import { useState } from 'react';


	const firebaseConfig = {
		apiKey: "AIzaSyATINV5ss5NJBlB1w4n3uwut0SGeg3nmQ4",
		authDomain: "buymore-formdata.firebaseapp.com",
		databaseURL: "https://buymore-formdata-default-rtdb.firebaseio.com",
		projectId: "buymore-formdata",
		storageBucket: "buymore-formdata.firebasestorage.app",
		messagingSenderId: "881503761984",
		appId: "1:881503761984:web:3cc9cf63073aad792e11a5",
		measurementId: "G-ES75829EY7"
	};
	
	//! init firebase app
	const app = initializeApp(firebaseConfig);
	//!init services
	const myDatabase = getFirestore(app);
	//!Collection ref 
	const colRef = collection(myDatabase, "buymore-data");
	
	getDocs(colRef)
	.then((snapshot)=>{
		// console.log(snapshot.docs);
		let userData = [];
		snapshot.docs.forEach((doc)=>{
			userData.push({ ...doc.data(), id: doc.id});
		})
		console.log(userData)	
	})
	.catch(err=>{
		console.log(err.message);
	});

	function App() {
		
		const {register, handleSubmit, watch, reset, formState: { errors }} = useForm();
		const onSubmit = (data) => {
			console.log(data);
			// console.log(data.first_name);
			addDoc(colRef, {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				phone: data.phone,
				dob: data.dob,
				address: data.address,
				house: data.house,
				city: data.city,
				postcode: data.postcode,
				province: data.province,
				country: data.country,
				agree_to_reg: data.agree_to_reg,
				agree_to_comms: data.agree_to_comms,
			})
			// .then(()=>{
			// })
			reset();
		}
		// console.log(watch("agree_to_reg"));

	return (
		<section className="form_holster">
			<header>
				<div className="dollar">
					<Logo/>
				</div>				
				<section className="title_section">
					<p className="title">Contest Entry Form</p>
				</section>
        	</header>
			{/* <p className="error_message global_error">"Please fill out all required fields before submitting the form."
        	</p> */}
			<form onSubmit={handleSubmit(onSubmit)} className="fieldset" alt="https://unsplash.com/photos/brown-wooden-lounge-chairs-near-pool-surrounded-by-palm-trees-vmIWr0NnpCQ">
				<section className="form_category name_section" aria-label="Name Section">
                    <aside className="name_holster">
                        <label htmlFor="first_name">First Name:</label>
                        <input {...register("first_name",{
							required: true,
							maxLength: 20,
							pattern: /^[a-zA-Z]+$/i
						})} type="text" name="first_name" id="first_name" placeholder="Example: John/Jane" aria-placeholder="Enter First Name Here" required aria-required autoFocus />
                        {errors.first_name && <p className="error_message">Only letters allowed for first name</p>}
						{errors?.first_name?.type === "maxLength" && (<p>First name cannot exceed 20 characters</p>)}
						{/* <p id="first_name_error" className="error_message">error_message</p> */}
                    </aside>

                    <aside className="name_holster">
                        <label htmlFor="last_name">Last Name:</label>
                        <input {...register("last_name",{
							required: true,
							maxLength: 20,
							pattern: /^[a-zA-Z]+$/i
						})} type="text" name="last_name" id="last_name" placeholder="Example: Doe" aria-placeholder="Enter Last Name Here" required aria-required />
                        {errors.last_name && <p className="error_message">Only letters allowed for last name</p>}
						{errors?.first_name?.type === "maxLength" && (<p>Last name cannot exceed 20 characters</p>)}
						{/* <p id="last_name_error" className="error_message">error message</p> */}
                    </aside>
                </section>
				<section className="form_category">
                    <label htmlFor="last_name">Enter Email Address:</label>
                    <input {...register("email",{
							required: true,
							pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
						})} type="email" name="email" id="email" placeholder="mail@example.com" aria-placeholder="Enter Email Address Here" required aria-required />
						{errors.email && <p className="error_message">Invalid email format. Please enter valid email e.g example@email.com</p>}
						{/* <p id="email_error" className="error_message">error message</p> */}
                </section>
				<section className="form_category">
                    <label htmlFor="phone">Enter Phone Number:</label>
                    <input {...register("phone",{
							required: true,
							pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i
						})} type="phone" name="phone" id="phone" placeholder="123-456-7890" aria-placeholder="Enter Phone Number Here" required aria-required />
                        {errors.phone && <p className="error_message">Please enter valid phone number</p>}
					{/* <p id="phone_error" className="error_message">error message</p> */}
                </section>
				<section className="form_category dob_section">
                    <label htmlFor="dob">Enter Date Of Birth:</label>
                    <input {...register("dob",{
							required: true,
							pattern: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/i
						})} type="date" name="dob" id="dob" max="2007-01-01" placeholder="yyyy-mm-dd" aria-required />
                        {errors.dob && <p className="error_message">Please enter valid dob</p>}
					{/* <p id="dob_error" className="error_message">error message</p> */}
                </section>
				<section className="form_category main_address_section">

                        <section className="physical_address_section">
                            <aside className="physical_address_input">
                                <label htmlFor="address">Street Address:</label>
                                <input {...register("address",{ 
									required: true,
									pattern: /^[a-zA-Z\s]*$/i
								})} type="text" name="address" id="address" placeholder="Data Boulevard" />
								{errors.address && <p className="error_message">Please enter valid address</p>}
								{/* <p id="address_error" className="error_message">error message</p> */}
                            </aside>
        
                            <aside className="physical_address_input">
                                <label htmlFor="house">Apt/Hse Number</label>
                                <input {...register("house", {
									required: true,
									maxLength: 6,
									pattern: /^[a-zA-Z0-9]*/i
								})} type="text" name="house" id="house" placeholder="A84212" />
                                {errors.house && <p className="error_message">Please enter valid address</p>}
								{/* <p id="street_address_error_02" className="error_message">error message</p> */}
                            </aside>
                        </section>
                    

                        <section className="geo_address_section">

                            <aside className="geo_address_city">
                                <label htmlFor="city">City:</label>
                                <input {...register("city", {
									required: true,
									pattern: /^[a-zA-Z]+$/i
								})}type="text" name="city" id="city" />
								{errors.city && <p className="error_message">City is required</p>}
                                {/* <p id="city_error" className="error_message">error message</p> */}
                            </aside>

                            <aside className="geo_address_postcode">
                                <label htmlFor="postcode">Postal Code:</label>
                                <input {...register("postcode", {
									required: true,
									pattern: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i
								})}type="text" name="postcode" id="postcode" />
								{errors.postcode && <p className="error_message">Please enter valid postal code</p>}
                                {/* <p id="postcode_error" className="error_message">error message</p> */}
                            </aside>
        
                            <aside className="geo_address_province">
                                <label htmlFor="province">Province:</label>
                                <select {...register("province", {
									required: true,
									pattern: /[a-zA-Z0-9]\s*/i
								})} name="province" id="province">
                                    <option value="null">Select Province:</option>
                                    <option value="AB">Alberta</option>
                                    <option value="BC">British Columbia</option>
                                    <option value="MB">Manitoba</option>
                                    <option value="NB">New Brunswick</option>
                                    <option value="NL">Newfoundland and Labrador</option>
                                    <option value="NS">Nova Scotia</option>
                                    <option value="NT">Northwest Territories</option>
                                    <option value="NU">Nunavut</option>
                                    <option value="ON">Ontario</option>
                                    <option value="PE">Prince Edward Island</option>
                                    <option value="QC">Quebec</option>
                                    <option value="SK">Saskatchewan</option>
                                    <option value="YT">Yukon</option>
                                </select>
								{errors.province && <p className="error_message">Please select a province</p>}
                                {/* <p id="province_error" className="error_message">error message</p> */}
                            </aside>

                            <aside className="geo_address_country">
                                <label htmlFor="country">Country:</label>
                                <select {...register("country", {
									required: true,
									pattern: /[a-zA-Z0-9]\s*/i
								})} name="country" id="country">
                                    <option value="null">Select Country:</option>
                                    <option value="United States">United States</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">American Samoa</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antartica">Antarctica</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">Bouvet Island</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Cayman Islands">Cayman Islands</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">Christmas Island</option>
                                    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo">Congo, the Democratic Republic of the</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                                    <option value="Croatia">Croatia (Hrvatska)</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="East Timor">East Timor</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="France Metropolitan">France, Metropolitan</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">French Polynesia</option>
                                    <option value="French Southern Territories">French Southern Territories</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                                    <option value="Holy See">Holy See (Vatican City State)</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran">Iran (Islamic Republic of)</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                                    <option value="Korea">Korea, Republic of</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Lao">Lao People's Democratic Republic</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macau">Macau</option>
                                    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia">Micronesia, Federated States of</option>
                                    <option value="Moldova">Moldova, Republic of</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">Norfolk Island</option>
                                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russian Federation</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
                                    <option value="Saint Lucia">Saint LUCIA</option>
                                    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                                    <option value="aside">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="St. Helena">St. Helena</option>
                                    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syrian Arab Republic</option>
                                    <option value="Taiwan">Taiwan, Province of China</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania">Tanzania, United Republic of</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks and Caicos">Turks and Caicos Islands</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Viet Nam</option>
                                    <option value="Virgin Islands (British)">Virgin Islands British</option>
                                    <option value="Virgin Islands (U.S)">Virgin Islands U.S.</option>
                                    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                                    <option value="Western Sahara">Western Sahara</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
								{errors.country && <p className="error_message">Country is required</p>}
                                {/* <p id="country_error" className="error_message">error message</p> */}
                            </aside>

                        </section>

						<p className="consent_title">CONSENT TO RULES & REGULATIONS</p>
                    <section className="rules_reg">

                        <aside className="checkbox">
                            <input {...register("agree_to_reg",{required: true})} type="checkbox" name="agree_to_reg" id="agree_to_reg" required />
                        </aside> 

                        <aside className="rules_statement">
                            <p className="conditions">I have read and agree to the rules and regulations of the contest.</p>
                        </aside>

                    </section>
					{errors.agree_to_reg && <p className="error_message">Please agree on the rules & regulations</p>}
                    {/* <p id="reg_error" className="error_message">error message</p> */}


                    <p className="consent_title">CONSENT TO COMMUNICATIONS</p>
                    <section className="rules_reg">

                        <aside className="checkbox">
                            <input {...register("agree_to_comms",{required: false})} type="checkbox" name="agree_to_comms" id="agree_to_comms"/>
                        </aside>

                        <aside className="rules_statement">
                            <p className="conditions">I consent to receiving updates and communications regarding BuyMore Dollar products and sponsor promotions.</p>
                        </aside>

                    </section>
					{errors.agree_to_comms && <p className="error_message">Please agree to receiving communication</p>}
                    {/* <p id="comms_error" className="error_message">error message</p> */}

                    <section className="form_category submit_section">
                        <button id="submit_button">Submit</button>
                    </section>

                    {/* <p className="error_message global_error">"Please fill out all required fields before submitting the form."
                    </p> */}
                </section>
			</form>
		</section>
	);
	}

	export default App;

"use strict";

// Class definition
var KTCreateAccount = function () {
  // Elements
  var modal;
  var modalEl;

  var stepper;
  var form;
  var formSubmitButton;
  var formContinueButton;

  // Variables
  var stepperObj;
  var validations = [];

  //states and their district info variables
  var AndraPradesh = ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"];
  var ArunachalPradesh = ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar"];
  var Assam = ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup (Rural)", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"];
  var Bihar = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"];
  var Chhattisgarh = ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"];
  var Goa = ["North Goa", "South Goa"];
  var Gujarat = ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"];
  var Haryana = ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"];
  var HimachalPradesh = ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"];
  var JammuKashmir = ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kargil", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"];
  var Jharkhand = ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"];
  var Karnataka = ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Vijayapura", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"];
  var Kerala = ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"];
  var Ladakh = ["Leh"];
  var MadhyaPradesh = ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna",
    "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"];
  var Maharashtra = ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"];
  var Manipur = ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"];
  var Meghalaya = ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"];
  var Mizoram = ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"];
  var Nagaland = ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"];
  var Odisha = ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"];
  var Punjab = ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Mohali", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"];
  var Rajasthan = ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"];
  var Sikkim = ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"];
  var TamilNadu = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"];
  var Telangana = ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"];
  var Tripura = ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"];
  var UttarPradesh = ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"];
  var Uttarakhand = ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri", "Pithoragarh", "Rudraprayag", "Tehri", "Udham Singh Nagar", "Uttarkashi"];
  var WestBengal = ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"];
  var AndamanNicobar = ["Nicobar", "North Middle Andaman", "South Andaman"];
  var Chandigarh = ["Chandigarh"];
  var DadraHaveli = ["Dadra Nagar Haveli"];
  var DamanDiu = ["Daman", "Diu"];
  var Delhi = ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"];
  var Lakshadweep = ["Lakshadweep"];
  var Puducherry = ["Karaikal", "Mahe", "Puducherry", "Yanam"];

  // Private Functions
  var initStepper = function () {
    // Initialize Stepper
    stepperObj = new KTStepper(stepper);

    // Stepper change event
    stepperObj.on('kt.stepper.changed', function (stepper) {
      if (stepperObj.getCurrentStepIndex() === 4) {
        formSubmitButton.classList.remove('d-none');
        formSubmitButton.classList.add('d-inline-block');
        formContinueButton.classList.add('d-none');
      }
      else if (stepperObj.getCurrentStepIndex() === 5) {
        formSubmitButton.classList.add('d-none');
        formContinueButton.classList.add('d-none');
      }
      else {
        formSubmitButton.classList.remove('d-inline-block');
        formSubmitButton.classList.remove('d-none');
        formContinueButton.classList.remove('d-none');
      }
    });

    // Validation before going to next page
    stepperObj.on('kt.stepper.next', function (stepper) {
      console.log('stepper.next');

      // Validate form before change stepper step
      var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for current step

      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            stepper.goNext();

            KTUtil.scrollTop();
          }
          else {
            Swal.fire({
              text: "Sorry, looks like there are some errors detected, please try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-light"
              }
            }).then(function () {
              KTUtil.scrollTop();
            });
          }
        });
      }
      else {
        stepper.goNext();

        KTUtil.scrollTop();
      }
    });

    // Prev event
    stepperObj.on('kt.stepper.previous', function (stepper) {
      console.log('stepper.previous');

      stepper.goPrevious();
      KTUtil.scrollTop();
    });
  }

  var handleForm = function () {
    formSubmitButton.addEventListener('click', function (e) {
      // Validate form before change stepper step
      var validator = validations[3]; // get validator for last form

      validator.validate().then(function (status) {
        console.log('validated!');

        if (status == 'Valid') {
          // Prevent default button action
          e.preventDefault();

          // Disable button to avoid multiple click
          formSubmitButton.disabled = true;

          // Show loading indication
          formSubmitButton.setAttribute('data-kt-indicator', 'on');

          // Simulate form submission
          setTimeout(function () {
            // Hide loading indication
            formSubmitButton.removeAttribute('data-kt-indicator');

            // Enable button
            formSubmitButton.disabled = false;

            stepperObj.goNext();
          }, 2000);
        }
        else {
          Swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-light"
            }
          }).then(function () {
            KTUtil.scrollTop();
          });
        }
      });
    });

    // Expiry month. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="card_expiry_month"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validations[3].revalidateField('card_expiry_month');
    });

    // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="card_expiry_year"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validations[3].revalidateField('card_expiry_year');
    });

    // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="business_type"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validations[2].revalidateField('business_type');
    });
  }

  var initValidation = function () {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    // Step 1
    validations.push(FormValidation.formValidation(
      form,
      {
        fields: {
          account_type: {
            validators: {
              notEmpty: {
                message: 'Account type is required'
              }
            }
          },
          state: {
            validators: {
              notEmpty: {
                message: 'State name is required'
              }
            }
          },
          city: {
            validators: {
              notEmpty: {
                message: 'District name is required'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    ));

    // Step 2
    validations.push(FormValidation.formValidation(
      form,
      {
        fields: {
          'retailOutlet': {
            validators: {
              notEmpty: {
                message: 'Specify your outlet name'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    ));

    // Step 3
    validations.push(FormValidation.formValidation(
      form,
      {
        fields: {
          'phone_no': {
            validators: {
              notEmpty: {
                message: 'Phone number is required'
              },
              digits: {
                message: 'Phone number must contain only digits'
              },
              stringLength: {
                min: 10,
                max: 10,
                message: 'Phone number must be 10 digits only'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    ));

    // Step 4
    validations.push(FormValidation.formValidation(
      form,
      {
        fields: {
          'card_name': {
            validators: {
              notEmpty: {
                message: 'Name on card is required'
              }
            }
          },
          'card_number': {
            validators: {
              notEmpty: {
                message: 'Card member is required'
              },
              creditCard: {
                message: 'Card number is not valid'
              }
            }
          },
          'card_expiry_month': {
            validators: {
              notEmpty: {
                message: 'Month is required'
              }
            }
          },
          'card_expiry_year': {
            validators: {
              notEmpty: {
                message: 'Year is required'
              }
            }
          },
          'card_cvv': {
            validators: {
              notEmpty: {
                message: 'CVV is required'
              },
              digits: {
                message: 'CVV must contain only digits'
              },
              stringLength: {
                min: 3,
                max: 4,
                message: 'CVV must contain 3 to 4 digits only'
              }
            }
          }
        },

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    ));
  }


  //state-district info function
  $("#inputState").change(function () {
    var StateSelected = $(this).val();
    var optionsList;
    var htmlString = "";

    switch (StateSelected) {
      case "AP":
        optionsList = AndraPradesh;
        break;
      case "AR":
        optionsList = ArunachalPradesh;
        break;
      case "AS":
        optionsList = Assam;
        break;
      case "BR":
        optionsList = Bihar;
        break;
      case "CT":
        optionsList = Chhattisgarh;
        break;
      case "GA":
        optionsList = Goa;
        break;
      case  "GJ":
        optionsList = Gujarat;
        break;
      case "HR":
        optionsList = Haryana;
        break;
      case "HP":
        optionsList = HimachalPradesh;
        break;
      case "JK":
        optionsList = JammuKashmir;
        break;
      case "JH":
        optionsList = Jharkhand;
        break;
      case  "KA":
        optionsList = Karnataka;
        break;
      case "KL":
        optionsList = Kerala;
        break;
      case  "MP":
        optionsList = MadhyaPradesh;
        break;
      case "MH":
        optionsList = Maharashtra;
        break;
      case  "MN":
        optionsList = Manipur;
        break;
      case "ML":
        optionsList = Meghalaya;
        break;
      case  "MZ":
        optionsList = Mizoram;
        break;
      case "NL":
        optionsList = Nagaland;
        break;
      case  "OR":
        optionsList = Odisha;
        break;
      case "PB":
        optionsList = Punjab;
        break;
      case  "RJ":
        optionsList = Rajasthan;
        break;
      case "SK":
        optionsList = Sikkim;
        break;
      case  "TN":
        optionsList = TamilNadu;
        break;
      case  "TG":
        optionsList = Telangana;
        break;
      case "TR":
        optionsList = Tripura;
        break;
      case  "UT":
        optionsList = Uttarakhand;
        break;
      case  "UP":
        optionsList = UttarPradesh;
        break;
      case "WB":
        optionsList = WestBengal;
        break;
      case  "AN":
        optionsList = AndamanNicobar;
        break;
      case "CH":
        optionsList = Chandigarh;
        break;
      case  "DN":
        optionsList = DadraHaveli;
        break;
      case "DD":
        optionsList = DamanDiu;
        break;
      case  "DL":
        optionsList = Delhi;
        break;
      case "LD":
        optionsList = Lakshadweep;
        break;
      case  "PY":
        optionsList = Puducherry;
        break;
      case  "LA":
        optionsList = Ladakh;
        break;
    }
    for (var i = 0; i < optionsList.length; i++) {
      htmlString = htmlString + "<option value='" + optionsList[i] + "'>" + optionsList[i] + "</option>";
    }
    $("#inputDistrict").html(htmlString);
  });

  var ro_info = function () {
    var data = [
      {id: 1, name: "Pump 1", inputDistrict: "city1", inputState: "RJ"},
      {id: 2, name: "Pump 2", city: "city2", inputState: "RJ"},
      {id: 3, name: "Pump 3", city: "city1", inputState: "RJ"},
      {id: 4, name: "Pump 4", city: "city2", inputState: "UP"},
      {id: 5, name: "Pump 5", city: "city3", inputState: "UP"}
    ]
  }


  return {
    // Public Functions
    init: function () {
      // Elements
      modalEl = document.querySelector('#kt_modal_create_account');

      if (modalEl) {
        modal = new bootstrap.Modal(modalEl);
      }

      stepper = document.querySelector('#kt_create_account_stepper');

      if (!stepper) {
        return;
      }

      form = stepper.querySelector('#kt_create_account_form');
      formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
      formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');

      initStepper();
      initValidation();
      handleForm();


    }
  };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTCreateAccount.init();
});

// "use strict";
//
// // Class definition
// var KTCreateAccount = function () {
//     // Elements
//     var modal;
//     var modalEl;
//
//     var stepper;
//     var form;
//     var formSubmitButton;
//     var formContinueButton;
//
//     // Variables
//     var stepperObj;
//     var validations = [];
//
//     // Private Functions
//     var initStepper = function () {
//         // Initialize Stepper
//         stepperObj = new KTStepper(stepper);
//
//         // Stepper change event
//         stepperObj.on('kt.stepper.changed', function (stepper) {
//             if (stepperObj.getCurrentStepIndex() === 4) {
//                 formSubmitButton.classList.remove('d-none');
//                 formSubmitButton.classList.add('d-inline-block');
//                 formContinueButton.classList.add('d-none');
//             } else if (stepperObj.getCurrentStepIndex() === 5) {
//                 formSubmitButton.classList.add('d-none');
//                 formContinueButton.classList.add('d-none');
//             } else {
//                 formSubmitButton.classList.remove('d-inline-block');
//                 formSubmitButton.classList.remove('d-none');
//                 formContinueButton.classList.remove('d-none');
//             }
//         });
//
//         // Validation before going to next page
//         stepperObj.on('kt.stepper.next', function (stepper) {
//             console.log('stepper.next');
//
//             // Validate form before change stepper step
//             var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for currnt step
//
//             if (validator) {
//                 validator.validate().then(function (status) {
//                     console.log('validated!');
//
//                     if (status == 'Valid') {
//                         stepper.goNext();
//
//                         KTUtil.scrollTop();
//                     } else {
//                         Swal.fire({
//                             text: "Sorry, looks like there are some errors detected, please try again.",
//                             icon: "error",
//                             buttonsStyling: false,
//                             confirmButtonText: "Ok, got it!",
//                             customClass: {
//                                 confirmButton: "btn btn-light"
//                             }
//                         }).then(function () {
//                             KTUtil.scrollTop();
//                         });
//                     }
//                 });
//             } else {
//                 stepper.goNext();
//
//                 KTUtil.scrollTop();
//             }
//         });
//
//         // Prev event
//         stepperObj.on('kt.stepper.previous', function (stepper) {
//             console.log('stepper.previous');
//
//             stepper.goPrevious();
//             KTUtil.scrollTop();
//         });
//     }
//
//     var handleForm = function () {
//         formSubmitButton.addEventListener('click', function (e) {
//             // Validate form before change stepper step
//             var validator = validations[3]; // get validator for last form
//
//             validator.validate().then(function (status) {
//                 console.log('validated!');
//
//                 if (status == 'Valid') {
//                     // Prevent default button action
//                     e.preventDefault();
//
//                     // Disable button to avoid multiple click
//                     formSubmitButton.disabled = true;
//
//                     // Show loading indication
//                     formSubmitButton.setAttribute('data-kt-indicator', 'on');
//
//                     // Simulate form submission
//                     setTimeout(function () {
//                         // Hide loading indication
//                         formSubmitButton.removeAttribute('data-kt-indicator');
//
//                         // Enable button
//                         formSubmitButton.disabled = false;
//
//                         stepperObj.goNext();
//                     }, 2000);
//                 } else {
//                     Swal.fire({
//                         text: "Sorry, looks like there are some errors detected, please try again.",
//                         icon: "error",
//                         buttonsStyling: false,
//                         confirmButtonText: "Ok, got it!",
//                         customClass: {
//                             confirmButton: "btn btn-light"
//                         }
//                     }).then(function () {
//                         KTUtil.scrollTop();
//                     });
//                 }
//             });
//         });
//
//         // Expiry month. For more info, plase visit the official plugin site: https://select2.org/
//         $(form.querySelector('[name="card_expiry_month"]')).on('change', function () {
//             // Revalidate the field when an option is chosen
//             validations[3].revalidateField('card_expiry_month');
//         });
//
//         // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
//         $(form.querySelector('[name="card_expiry_year"]')).on('change', function () {
//             // Revalidate the field when an option is chosen
//             validations[3].revalidateField('card_expiry_year');
//         });
//
//         // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
//         $(form.querySelector('[name="business_type"]')).on('change', function () {
//             // Revalidate the field when an option is chosen
//             validations[2].revalidateField('business_type');
//         });
//     }
//
//     var initValidation = function () {
//         // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
//         // Step 1
//         validations.push(FormValidation.formValidation(
//             form,
//             {
//                 fields: {
//                     account_type: {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Account type is required'
//                             }
//                         }
//                     }
//                 },
//                 plugins: {
//                     trigger: new FormValidation.plugins.Trigger(),
//                     bootstrap: new FormValidation.plugins.Bootstrap5({
//                         rowSelector: '.fv-row',
//                         eleInvalidClass: '',
//                         eleValidClass: ''
//                     })
//                 }
//             }
//         ));
//
//         // Step 2
//         validations.push(FormValidation.formValidation(
//             form,
//             {
//                 fields: {
//                     'account_team_size': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Time size is required'
//                             }
//                         }
//                     },
//                     'account_name': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Account name is required'
//                             }
//                         }
//                     },
//                     'account_plan': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Account plan is required'
//                             }
//                         }
//                     }
//                 },
//                 plugins: {
//                     trigger: new FormValidation.plugins.Trigger(),
//                     // Bootstrap Framework Integration
//                     bootstrap: new FormValidation.plugins.Bootstrap5({
//                         rowSelector: '.fv-row',
//                         eleInvalidClass: '',
//                         eleValidClass: ''
//                     })
//                 }
//             }
//         ));
//
//         // Step 3
//         validations.push(FormValidation.formValidation(
//             form,
//             {
//                 fields: {
//                     'business_name': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Busines name is required'
//                             }
//                         }
//                     },
//                     'business_descriptor': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Busines descriptor is required'
//                             }
//                         }
//                     },
//                     'business_type': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Busines type is required'
//                             }
//                         }
//                     },
//                     'business_email': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Busines email is required'
//                             },
//                             emailAddress: {
//                                 message: 'The value is not a valid email address'
//                             }
//                         }
//                     }
//                 },
//                 plugins: {
//                     trigger: new FormValidation.plugins.Trigger(),
//                     // Bootstrap Framework Integration
//                     bootstrap: new FormValidation.plugins.Bootstrap5({
//                         rowSelector: '.fv-row',
//                         eleInvalidClass: '',
//                         eleValidClass: ''
//                     })
//                 }
//             }
//         ));
//
//         // Step 4
//         validations.push(FormValidation.formValidation(
//             form,
//             {
//                 fields: {
//                     'card_name': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Name on card is required'
//                             }
//                         }
//                     },
//                     'card_number': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Card member is required'
//                             },
//                             creditCard: {
//                                 message: 'Card number is not valid'
//                             }
//                         }
//                     },
//                     'card_expiry_month': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Month is required'
//                             }
//                         }
//                     },
//                     'card_expiry_year': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'Year is required'
//                             }
//                         }
//                     },
//                     'card_cvv': {
//                         validators: {
//                             notEmpty: {
//                                 message: 'CVV is required'
//                             },
//                             digits: {
//                                 message: 'CVV must contain only digits'
//                             },
//                             stringLength: {
//                                 min: 3,
//                                 max: 4,
//                                 message: 'CVV must contain 3 to 4 digits only'
//                             }
//                         }
//                     }
//                 },
//
//                 plugins: {
//                     trigger: new FormValidation.plugins.Trigger(),
//                     // Bootstrap Framework Integration
//                     bootstrap: new FormValidation.plugins.Bootstrap5({
//                         rowSelector: '.fv-row',
//                         eleInvalidClass: '',
//                         eleValidClass: ''
//                     })
//                 }
//             }
//         ));
//     }
//
//     return {
//         // Public Functions
//         init: function () {
//             // Elements
//             modalEl = document.querySelector('#kt_modal_create_account');
//
//             if (modalEl) {
//                 modal = new bootstrap.Modal(modalEl);
//             }
//
//             stepper = document.querySelector('#kt_create_account_stepper');
//
//             if (!stepper) {
//                 return;
//             }
//
//             form = stepper.querySelector('#kt_create_account_form');
//             formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
//             formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');
//
//             initStepper();
//             initValidation();
//             handleForm();
//         }
//     };
// }();
//
// // On document ready
// KTUtil.onDOMContentLoaded(function () {
//     KTCreateAccount.init();
// });
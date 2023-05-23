document.addEventListener("DOMContentLoaded", function() {

/*========================== GENERAL CONST =============================*/
const interestRate = 9.50;      //%
const pOriginationFee = 2.50 ;
const pprocessingFee = 300 ;
const appraisalCost = 2.5;


const propertyValue = document.getElementById("propertyValue"); ////homevalue
const amountRequest= document.getElementById("amountRequest");//loanamount
const porcentLoan= document.getElementById("porcentLoan"); porcentLoan.readOnly = true;
const form = document.getElementById("mortgage");


/*========================== 20 YEARS INPUTS =============================*/
const montlyPayment_20= document.getElementById("montlyPayment_20"); montlyPayment_20.readOnly = true;
const requiredIncome_20 = document.getElementById("requiredIncome_20"); requiredIncome_20.readOnly = true;
const annualInterest_20 = document.getElementById("annualInterest_20"); annualInterest_20.readOnly = true;
const originationFee_20 = document.getElementById("originationFee_20"); originationFee_20.readOnly = true;
const processingFee_20 = document.getElementById("processingFee_20"); processingFee_20.readOnly = true;
const downPayment_20 = document.getElementById("downPayment_20"); downPayment_20.readOnly = true;
const feesExpenses_20 = document.getElementById("feesExpenses_20"); feesExpenses_20.readOnly = true;
const closingCosts_20 = document.getElementById("closingCosts_20"); closingCosts_20.readOnly = true;
const propertyAppraisal_20 = document.getElementById("propertyAppraisal_20"); propertyAppraisal_20.readOnly = true;

/*========================== 15 YEARS INPUTS =============================*/
const montlyPayment_15= document.getElementById("montlyPayment_15"); montlyPayment_15.readOnly = true; 
const requiredIncome_15 = document.getElementById("requiredIncome_15"); requiredIncome_15.readOnly = true;
const annualInterest_15 = document.getElementById("annualInterest_15"); annualInterest_15.readOnly = true;
const originationFee_15 = document.getElementById("originationFee_15"); originationFee_15.readOnly = true;
const processingFee_15 = document.getElementById("processingFee_15"); processingFee_15.readOnly = true;
const downPayment_15 = document.getElementById("downPayment_15"); downPayment_15.readOnly = true;
const feesExpenses_15 = document.getElementById("feesExpenses_15"); feesExpenses_15.readOnly = true;
const closingCosts_15 = document.getElementById("closingCosts_15"); closingCosts_15.readOnly = true;
const propertyAppraisal_15 = document.getElementById("propertyAppraisal_15"); propertyAppraisal_15.readOnly = true;

/*========================== 10 YEARS INPUTS =============================*/
const montlyPayment_10= document.getElementById("montlyPayment_10"); montlyPayment_10.readOnly = true;
const requiredIncome_10 = document.getElementById("requiredIncome_10"); requiredIncome_10.readOnly = true;
const annualInterest_10 = document.getElementById("annualInterest_10"); annualInterest_10.readOnly = true;
const originationFee_10 = document.getElementById("originationFee_10"); originationFee_10.readOnly = true;
const processingFee_10 = document.getElementById("processingFee_10"); processingFee_10.readOnly = true;
const downPayment_10 = document.getElementById("downPayment_10"); downPayment_10.readOnly = true;
const feesExpenses_10 = document.getElementById("feesExpenses_10"); feesExpenses_10.readOnly = true;
const closingCosts_10 = document.getElementById("closingCosts_10"); closingCosts_10.readOnly = true;
const propertyAppraisal_10 = document.getElementById("propertyAppraisal_10"); propertyAppraisal_10.readOnly = true;



function formatAndSetCurrencyValue(value, element) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
  
  element.value = formattedValue;
}

// Jquery Dependency
$("input[data-type='currency']").on({
  keyup: function() {
    formatCurrency($(this));
  },
  blur: function() { 
    formatCurrency($(this), "blur");
  }
});


function formatNumber(n) {
// format number 1000000 to 1,234,567
return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
// appends $ to value, validates decimal side
// and puts cursor back in right position.

// get input value
var input_val = input.val();

// don't validate empty input
if (input_val === "") { return; }

// original length
var original_len = input_val.length;

// initial caret position 
var caret_pos = input.prop("selectionStart");
  
// check for decimal
if (input_val.indexOf(".") >= 0) {

  // get position of first decimal
  // this prevents multiple decimals from
  // being entered
  var decimal_pos = input_val.indexOf(".");

  // split number by decimal point
  var left_side = input_val.substring(0, decimal_pos);
  var right_side = input_val.substring(decimal_pos);

  // add commas to left side of number
  left_side = formatNumber(left_side);

  // validate right side
  right_side = formatNumber(right_side);
  
  // On blur make sure 2 numbers after decimal
  if (blur === "blur") {
    right_side += "00";
  }
  
  // Limit decimal to only 2 digits
  right_side = right_side.substring(0, 2);

  // join number by .
  input_val = "$" + left_side + "." + right_side;

} else {
  // no decimal entered
  // add commas to number
  // remove all non-digits
  input_val = formatNumber(input_val);
  input_val = "$" + input_val;
  
  // final formatting
  if (blur === "blur") {
    input_val += ".00";
  }
}

// send updated string to input
input.val(input_val);

// put caret back in the right position
var updated_len = input_val.length;
caret_pos = updated_len - original_len + caret_pos;
input[0].setSelectionRange(caret_pos, caret_pos);
}



/*========================== FORM =============================*/
document.getElementById("EvaluateBtn").addEventListener("click", 
function (e) {
  e.preventDefault();
  

  if(amountRequest.value === "") {
    alert("El campo Amount Requested es requerido");
    return;
  }
  
  if(propertyValue.value === "") {
    alert("El campo Property Value es requerido");
    return;
  }

  //term = document.getElementById("trm").value;    //años
  //apr = document.getElementById("apr").value;   //interest
  amt = document.getElementById("amountRequest").value.replace(/[^0-9.]/g, '');
  apr = 9.50 / 1200;
  term20 = 20 * 12;
  term15 = 15 * 12;
  term10 = 10 * 12;
  mPmt = calculatePayment();
  ///document.getElementById("pmt").value = "$" + mPmt.toFixed(2);

  
  porcentLoan.value = ((amountRequest.value.replace(/[^0-9.]/g, '') / propertyValue.value.replace(/[^0-9.]/g, ''))*100).toFixed(2)+" %";   ////Number()
  let porcentLoanValue = porcentLoan.value
  return (porcentLoanValue) ;


  /*========================== 20 YEARS CALCULATE =============================*/
  function calculatePayment()
  {
    
    /*========================== 20 YEARS CALCULATE =============================*/
    var payment20 = (amt*(apr * Math.pow((1 + apr), term20))/(Math.pow((1 + apr), term20) - 1)).toFixed(2);
    montlyPayment_20.value = payment20
    let montlyPayment_20Value = montlyPayment_20.value

    requiredIncome_20.value = parseFloat(montlyPayment_20Value * 3.1).toFixed(2);
    let requiredIncome_20Value = requiredIncome_20.value

    annualInterest_20.value = (interestRate).toFixed(2)+" %";
    var annualInterest_20Value = (annualInterest_20.value);

    originationFee_20.value = parseFloat((amt * pOriginationFee)/100).toFixed(2);
    var originationFee_20Value = parseFloat(originationFee_20.value);

    processingFee_20.value = parseFloat(pprocessingFee).toFixed(2);
    var processingFee_20Value = parseFloat(processingFee_20.value);
    
    downPayment_20.value = parseFloat(propertyValue.value.replace(/[^0-9.]/g, '') - amt).toFixed(2);
    var downPayment_20Value = parseFloat(downPayment_20.value);

    feesExpenses_20.value = parseFloat(propertyValue.value.replace(/[^0-9.]/g, '') * 0.07).toFixed(2);
    var feesExpenses_20Value = parseFloat(feesExpenses_20.value);

    if (appraisalCost * (propertyValue.value.replace(/[^0-9.]/g, '') / 1000) < 1000) {
      resultadopropertyAppraisal_20 = 1000;
    } else {
      resultadopropertyAppraisal_20 = appraisalCost * (propertyValue.value.replace(/[^0-9.]/g, '') / 1000);
    }
    
    propertyAppraisal_20.value = resultadopropertyAppraisal_20.toFixed(2);
    var propertyAppraisal_20Value = parseFloat(propertyAppraisal_20.value);


    var totalCosts20 = feesExpenses_20Value + downPayment_20Value + processingFee_20Value + originationFee_20Value + propertyAppraisal_20Value;
    closingCosts_20.value = totalCosts20.toFixed(2);


    // Llamadas a la función para asignar el valor formateado a los elementos correspondientes
    formatAndSetCurrencyValue(payment20, montlyPayment_20);
    formatAndSetCurrencyValue(requiredIncome_20Value, requiredIncome_20);
    formatAndSetCurrencyValue(originationFee_20Value, originationFee_20);
    formatAndSetCurrencyValue(processingFee_20Value, processingFee_20);
    formatAndSetCurrencyValue(propertyAppraisal_20Value, propertyAppraisal_20);
    formatAndSetCurrencyValue(downPayment_20Value, downPayment_20);
    formatAndSetCurrencyValue(feesExpenses_20Value, feesExpenses_20);
    formatAndSetCurrencyValue(totalCosts20, closingCosts_20);



    /*========================== 15 YEARS CALCULATE =============================*/
    var payment15 = (amt*(apr * Math.pow((1 + apr), term15))/(Math.pow((1 + apr), term15) - 1)).toFixed(2);
    montlyPayment_15.value = payment15
    let montlyPayment_15Value = montlyPayment_15.value

    requiredIncome_15.value = parseFloat(montlyPayment_15Value * 3.1).toFixed(2);
    let requiredIncome_15Value = requiredIncome_15.value

    annualInterest_15.value = (interestRate).toFixed(2)+" %";
    var annualInterest_15Value = (annualInterest_15.value);

    originationFee_15.value = parseFloat((amt * pOriginationFee)/100).toFixed(2);
    var originationFee_15Value = parseFloat(originationFee_15.value);

    processingFee_15.value = parseFloat(pprocessingFee).toFixed(2);
    var processingFee_15Value = parseFloat(processingFee_15.value);

    downPayment_15.value = parseFloat(propertyValue.value.replace(/[^0-9.]/g, '') - amt).toFixed(2);
    var downPayment_15Value = parseFloat(downPayment_15.value);

    feesExpenses_15.value = parseFloat(propertyValue.value.replace(/[^0-9.]/g, '') * 0.07).toFixed(2);
    var feesExpenses_15Value = parseFloat(feesExpenses_15.value);

    if (appraisalCost * (propertyValue.value.replace(/[^0-9.]/g, '') / 1000) < 1000) {
      resultadopropertyAppraisal_15 = 1000;
    } else {
      resultadopropertyAppraisal_15 = appraisalCost * (propertyValue.value.replace(/[^0-9.]/g, '') / 1000);
    }

    propertyAppraisal_15.value = resultadopropertyAppraisal_15.toFixed(2);
    var propertyAppraisal_15Value = parseFloat(propertyAppraisal_15.value);


    var totalCosts15 = feesExpenses_15Value + downPayment_15Value + processingFee_15Value + originationFee_15Value + propertyAppraisal_15Value;
    closingCosts_15.value = totalCosts15.toFixed(2);


    // Llamadas a la función para asignar el valor formateado a los elementos correspondientes
    formatAndSetCurrencyValue(payment15, montlyPayment_15);
    formatAndSetCurrencyValue(requiredIncome_15Value, requiredIncome_15);
    formatAndSetCurrencyValue(originationFee_15Value, originationFee_15);
    formatAndSetCurrencyValue(processingFee_15Value, processingFee_15);
    formatAndSetCurrencyValue(propertyAppraisal_15Value, propertyAppraisal_15);
    formatAndSetCurrencyValue(downPayment_15Value, downPayment_15);
    formatAndSetCurrencyValue(feesExpenses_15Value, feesExpenses_15);
    formatAndSetCurrencyValue(totalCosts15, closingCosts_15);


    /*========================== 10 YEARS CALCULATE =============================*/
    var payment10 = (amt*(apr * Math.pow((1 + apr), term10))/(Math.pow((1 + apr), term10) - 1)).toFixed(2);
    montlyPayment_10.value = payment10
    let montlyPayment_10Value = montlyPayment_10.value

    requiredIncome_10.value = parseFloat(montlyPayment_10Value * 3.1).toFixed(2);
    let requiredIncome_10Value = requiredIncome_10.value

    annualInterest_10.value = (interestRate).toFixed(2)+" %";
    var annualInterest_10Value = (annualInterest_10.value);

    originationFee_10.value = parseFloat((amt * pOriginationFee)/100).toFixed(2);
    var originationFee_10Value = parseFloat(originationFee_10.value);

    processingFee_10.value = parseFloat(pprocessingFee).toFixed(2);
    var processingFee_10Value = parseFloat(processingFee_10.value);

    downPayment_10.value = parseFloat(propertyValue.value.replace(/[^0-9.]/g, '') - amt).toFixed(2);
    var downPayment_10Value = parseFloat(downPayment_10.value);

    feesExpenses_10.value = parseFloat(propertyValue.value.replace(/[^0-9.]/g, '') * 0.07).toFixed(2);
    var feesExpenses_10Value = parseFloat(feesExpenses_10.value);

    if (appraisalCost * (propertyValue.value.replace(/[^0-9.]/g, '') / 1000) < 1000) {
      resultadopropertyAppraisal_10 = 1000;
    } else {
      resultadopropertyAppraisal_10 = appraisalCost * (propertyValue.value.replace(/[^0-9.]/g, '') / 1000);
    }

    propertyAppraisal_10.value = resultadopropertyAppraisal_10.toFixed(2);
    var propertyAppraisal_10Value = parseFloat(propertyAppraisal_10.value);


    var totalCosts10 = feesExpenses_10Value + downPayment_10Value + processingFee_10Value + originationFee_10Value + propertyAppraisal_10Value;
    closingCosts_10.value = totalCosts10.toFixed(2);


    // Llamadas a la función para asignar el valor formateado a los elementos correspondientes
    formatAndSetCurrencyValue(payment10, montlyPayment_10);
    formatAndSetCurrencyValue(requiredIncome_10Value, requiredIncome_10);
    formatAndSetCurrencyValue(originationFee_10Value, originationFee_10);
    formatAndSetCurrencyValue(processingFee_10Value, processingFee_10);
    formatAndSetCurrencyValue(propertyAppraisal_10Value, propertyAppraisal_10);
    formatAndSetCurrencyValue(downPayment_10Value, downPayment_10);
    formatAndSetCurrencyValue(feesExpenses_10Value, feesExpenses_10);
    formatAndSetCurrencyValue(totalCosts10, closingCosts_10);

    
  }


});


/*========================== RESET FORM =============================*/
  document.getElementById("ClearBtn").addEventListener("click", function(e){
    e.preventDefault()

    document.getElementById("mortgage");
    mortgage.reset()
  });

});
$(document).ready(function () {
    $('#taxForm').submit(function (e) {
      e.preventDefault();
      $('.error-icon').hide();
      let grossIncome = parseFloat($('#grossIncome').val());
      let extraIncome = parseFloat($('#extraIncome').val());
      let age = $('#age').val();
      let deductions = parseFloat($('#deductions').val());

      let error = false;

      if (isNaN(grossIncome) || grossIncome <= 0) {
        $('#grossIncomeError').show().attr('title', 'Please enter numbers only').tooltip('show');
        error = true;
      }

      if (isNaN(extraIncome) || extraIncome < 0) {
        $('#extraIncomeError').show().attr('title', 'Please enter numbers only').tooltip('show');
        error = true;
      }

      if (age === '') {
        $('#ageError').show();
        error = true;
      }

      if (isNaN(deductions) || deductions < 0) {
        $('#deductionsError').show().attr('title', 'Please enter numbers only').tooltip('show');
        error = true;
      }

      if (!error) {
        let tax;
        let taxableIncome = grossIncome + extraIncome - deductions;

        if (taxableIncome <= 800000) {
          tax = 0;
        } else {
          switch (age) {
            case '<40':
              tax = 0.3 * (taxableIncome-800000);
              break;
            case '40-60':
              tax = 0.4 * (taxableIncome-800000);
              break;
            case '>=60':
              tax = 0.1 * (taxableIncome-800000);
              break;
          }
        }

        $('#resultModal').modal('show');
        $('#resultBody').html(`<p>Taxable Income: ${taxableIncome.toFixed(2)} Lakhs</p><p>Tax to be paid: ${tax.toFixed(2)} Lakhs</p>`);
      }
    });
  });
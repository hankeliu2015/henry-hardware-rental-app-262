$(document).ready(function(){
  $('a.discount-rental').on('click', displayRentalForm)
})

function displayRentalForm(e) {
  e.preventDefault();
  let discoutToolId = parseInt(e.target.dataset.toolId) //tool_id not working.
  const discountRentForm = $(".hidden").html()
  $(`#formDiscountRental-${discoutToolId}`).html(discountRentForm)
  $(".hidden").html("")
  $(`form`).submit(function(event) {
    // event.preventDefault();
    createDiscountRentalObj(event, discoutToolId)
  })
}

function createDiscountRentalObj(e, idTool) {
  e.preventDefault();
  let value = $(e.target).serializeArray();

  let renting = $.post(`/tools/${idTool}/rentals.json`, value, function(data) {
    let custom_start_date = new Date(data.start_date)
    let custom_return_date = new Date(data.return_date)
    let content = `<p style="color: green" >Tool ${data.tool.name} rented successfully : Start Date: ${custom_start_date.toDateString()}; Return Date: ${custom_return_date.toDateString()} </p>`
    $(`#formDiscountRental-${idTool}`).html(content)
    $(`#rental-${idTool}`).html('')
  })
    .fail(function(data) {
    alert( "Tool is not available, please click on Rent button and choose available dates to schedule rental")
    let errorMessage = `<p style="color: maroon">${data.responseJSON.tool[0]}<p>`; //Status Code: ${data.status} unprocessable entity: ${data.statusText}
    $(`#formDiscountRental-${idTool}`).html(errorMessage)
  })

  ////fetch api submit rental form - need rebuild params for rental#create.
  // let rentalData = $(e.target).serializeArray();
  // let valueCSRF = rentalData[1].value
  //
  // let convertRentalData = {
  //   rental: {
  //     start_date: `${value[2]['value']}`,
  //     return_date: `${value[3]['value']}`,
  //     checkout: `${value[4]['value']}`
  //   }
  // }
  //
  // fetch(
  //   `/tools/${idTool}/rentals.json`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'X-CSRF-Token': valueCSRF
  //     },
  //     body: JSON.stringify(convertRentalData),
  //     credentials: 'same-origin'
  //   }
  // ).then(function(res){
  //   return res.json()
  // })
  // .then(function(rental) {
  //   console.log(rental)
  //   let toolName = rental.tool.name
  //   let idTool = rental.tool_id
  //   let custom_start_date = new Date(rental.start_date);
  //   let custom_return_date = new Date(rental.return_date);
  //
  //   let content = `<p style="color: green" >${toolName} rented successfully : Start Date: ${custom_start_date.toDateString()}; Return Date: ${custom_return_date.toDateString()} </p>`
  //    $(`#formDiscountRental-${idTool}`).html(content)
  //    $(`#rental-${idTool}`).html('')
  // })

}   //end of createDiscountRentalObj

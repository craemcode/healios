export const dollarAmount = (amount)=>{

    return Number(amount).toLocaleString('en-US', {minimumFractionDigits:2})

}
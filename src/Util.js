export default function formatCurrency(num){
    return "U$D" +  Number(num.toFixed(1)).toLocaleString() + " ";
}
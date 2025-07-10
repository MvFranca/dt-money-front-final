export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', 
        { 
            style: 'currency', 
            currency: 'BRL', 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
         }).format(value);
}
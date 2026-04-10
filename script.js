const translations = {
    ar: {
        appTitle: "تطبيق الذهب الفاخر",
        langToggle: "English",
        panel1Title: "حاسبة التجزئة",
        lblPrice: "سعر الذهب (للجرام)",
        lblWeight: "الوزن (بالجرام)",
        lblMaking: "المصنعية (للجرام)",
        lblTotalGold: "إجمالي سعر الذهب",
        lblTotalMaking: "إجمالي المصنعية",
        lblTax: "الضريبة (5%)",
        lblGrandTotal: "المبلغ الإجمالي",
        panel2Title: "أسعار السوق",
        lblMarketPrice: "سعر السوق العالمي",
        lbl24k: "سعر عيار 24",
        lbl22k: "سعر عيار 22",
        lbl21k: "سعر عيار 21",
        lbl18k: "سعر عيار 18",
        errNegative: "يرجى إدخال أرقام صحيحة وغير سالبة",
        errInput: "خطأ في المدخلات"
    },
    en: {
        appTitle: "Luxury Gold",
        langToggle: "العربية",
        panel1Title: "Retail Calculator",
        lblPrice: "Gold Price (per gram)",
        lblWeight: "Weight (grams)",
        lblMaking: "Making Charges (per gram)",
        lblTotalGold: "Total Gold Price",
        lblTotalMaking: "Total Making Charges",
        lblTax: "Tax (5%)",
        lblGrandTotal: "Grand Total",
        panel2Title: "Market Prices",
        lblMarketPrice: "World Market Price",
        lbl24k: "24K Price",
        lbl22k: "22K Price",
        lbl21k: "21K Price",
        lbl18k: "18K Price",
        errNegative: "Please enter valid non-negative numbers",
        errInput: "Input Error"
    }
};

let currentLang = 'ar';

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    for (const [id, text] of Object.entries(translations[currentLang])) {
        const element = document.getElementById(id);
        if (element) element.innerText = text;
    }
}

function showToast(message) {
    const toast = document.getElementById('error-toast');
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function validateAndCalculate(input, calcFunction) {
    const val = parseFloat(input.value);
    
    if (val < 0) {
        input.classList.add('invalid');
        showToast(translations[currentLang].errNegative);
        input.value = ""; 
    } else {
        input.classList.remove('invalid');
    }
    
    try {
        calcFunction();
    } catch (e) {
        console.error("Calculation Error", e);
    }
}

function formatNum(num) {
    if (isNaN(num) || !isFinite(num)) return "0.00";
    return num.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function calculateRetail() {
    const price = parseFloat(document.getElementById('p1_price').value) || 0;
    const weight = parseFloat(document.getElementById('p1_weight').value) || 0;
    const making = parseFloat(document.getElementById('p1_making').value) || 0;

    const totalGold = price * weight;
    const totalMaking = making * weight;
    const tax = (totalGold + totalMaking) * 0.05;
    const grandTotal = totalGold + totalMaking + tax;

    document.getElementById('p1_out_gold').value = formatNum(totalGold);
    document.getElementById('p1_out_making').value = formatNum(totalMaking);
    document.getElementById('p1_out_tax').value = formatNum(tax);
    document.getElementById('p1_out_total').value = formatNum(grandTotal);
}

function calculateMarket() {
    const marketPrice = parseFloat(document.getElementById('p2_market').value) || 0;

    const price24k = marketPrice * 118.122;
    const price22k = price24k * 0.9166; 
    const price21k = price24k * 0.880;
    const price18k = price24k * 0.750;

    document.getElementById('p2_out_24k').value = formatNum(price24k);
    document.getElementById('p2_out_22k').value = formatNum(price22k);
    document.getElementById('p2_out_21k').value = formatNum(price21k);
    document.getElementById('p2_out_18k').value = formatNum(price18k);
}
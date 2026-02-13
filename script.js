document.addEventListener('DOMContentLoaded',()=>{
    let header = document.querySelector('.header');
    let btns = document.querySelectorAll('.row .container-image');
    let otherBtns = document.querySelectorAll('.row.p-0 .container-img');
    let img = document.querySelector('.img-fluid');
    let img2 = document.querySelector('.img-second');
    let performanceBtns = document.querySelectorAll('.column button');
    let performanceUpgradeBtn = document.querySelector('.section-row>button');
    let selectedColor = 'stealth-grey';
    let totalPriceElement = document.querySelector('#total-price');
    let checkboxFullSelf = document.querySelector('#fullSelfDriving');
    let containerAccesoriesInput = document.querySelectorAll('.price-container input');
    let downPaymentElement = document.querySelector('#down-payment');
    let monthlyPaymentElement = document.querySelector('#monthly-payment');

    let basePrice = 52490;
    let currentPrice = basePrice;
    const performanceOptions = {
        'Performance Wheels': false,
        'Full Self-Driving': false,
        'Performance Upgrade': false,
        'Accesories':{
            'Center Console Trays': false,
            'SunShade':false,
            'All-Weather Interior Liners':false
        }
    }
    const pricingOptions = {
        'Performance Wheels':2500,
        'Full Self-Driving':8500,
        'Performance Upgrade':5000,
        'Accesories':{
            'Center Console Trays':35,
            'SunShade':105,
            'All-Weather Interior Liners':225
        }
    };
    
    containerAccesoriesInput.forEach(input=>{
        input.addEventListener('change',()=>{
            let accessoryOption = input.dataset.accesory;            
            if(input.checked)
            {
                performanceOptions['Accesories'][accessoryOption] = true;

            }
            else{
                performanceOptions['Accesories'][accessoryOption] = false;
            }
            updateTotalPrice();
        })
    })
    checkboxFullSelf.addEventListener('change',()=>{
        if(checkboxFullSelf.checked)
        {
            performanceOptions['Full Self-Driving'] = true;
        }
        else{
            performanceOptions['Full Self-Driving'] = false;
        }
        updateTotalPrice();
    })
    performanceUpgradeBtn.addEventListener('click',(e)=>{
        e.target.classList.toggle('black');
        e.target.classList.toggle('text-white');
        if(performanceOptions['Performance Upgrade'] === false)
        {
            performanceOptions['Performance Upgrade'] = true;
        }
        else{
            performanceOptions['Performance Upgrade'] = false;
        }
        updateTotalPrice();
    })
    performanceBtns.forEach((btn)=>{
        btn.addEventListener(('click'),(e)=>{
            performanceBtns.forEach((btn)=>btn.classList.remove('black', 'text-white'));
            e.target.classList.add('black', 'text-white');
            performanceOptions['Performance Wheels'] = e.target.textContent.includes('Performance');            
            updateCar();
            updateTotalPrice();
        })
    })    
    btns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            changeTheme(btns, btn);
            selectedColor = btn.dataset.color;                        
            if(!selectedColor) return;
            updateCar();
        })
    })
    otherBtns.forEach(btn=>{
        btn.addEventListener('click',()=>{
            changeTheme(otherBtns, btn);
            let dataset = btn.dataset.color;
            if(!dataset) return;
            img2.src = exteriorImages[dataset];
            
        })
    })    
    let images = {
        'deep-blue-metallic' : 'images/model-y-deep-blue-metallic.jpg',
        'pearl-white': 'images/model-y-pearl-white.jpg',
        'quick-silver': 'images/model-y-quick-silver.jpg',
        'solid-black': 'images/model-y-solid-black.jpg',
        'stealth-grey': 'images/model-y-stealth-grey.jpg',
        'ultra-red' :'images/model-y-ultra-red.jpg',
    }
    let exteriorImages = {
        'Light' : 'images/model-y-interior-light.jpg',
        'Dark' : 'images/model-y-interior-dark.jpg'
    };
    const changeTheme = (buttons, ourBtn) =>{
        buttons.forEach((button)=>button.classList.remove('active'));
        ourBtn.classList.add('active');
    }
    const updatePayments = () =>{
        let downPayment = currentPrice * 0.1;
        downPaymentElement.innerHTML = `Down Payment: <strong> $${downPayment.toLocaleString()} </strong>`;
        const loanMonths = 60;
        const interestRate = 0.03;
        const loanAmount = currentPrice - downPayment;
        let interestMonthlyRate = interestRate/12;
        let EstimatedMonthlyPayment = (loanAmount* interestMonthlyRate)/(1-(Math.pow(1+interestMonthlyRate, -loanMonths)));
        monthlyPaymentElement.innerHTML = `Estimated Monthly Payment: <strong>$${EstimatedMonthlyPayment.toFixed(2).toLocaleString('en-US')} </strong>`;
    }

    const updateCar = () =>{
        let performanceSuffix = performanceOptions['Performance Wheels'] ? '-performance' : '';
        let myColor = selectedColor in images ? selectedColor : 'stealth-grey';
        img.src = images[myColor].replace('.jpg', `${performanceSuffix}.jpg`);
    }
    const updateTotalPrice = () =>{
        currentPrice = basePrice;
        if(performanceOptions['Performance Wheels'])
        {
            currentPrice += pricingOptions['Performance Wheels'];
        }
        if(performanceOptions['Performance Upgrade'])
        {
            currentPrice += pricingOptions['Performance Upgrade'];
        }
        if(performanceOptions['Full Self-Driving'])
        {
            currentPrice += pricingOptions['Full Self-Driving'];
        }
        if(performanceOptions['Accesories']['Center Console Trays'])
        {
            currentPrice += pricingOptions['Accesories']['Center Console Trays'];
        }
        if(performanceOptions['Accesories']['SunShade'])
        {
            currentPrice += pricingOptions['Accesories']['SunShade'];
        }
        if(performanceOptions['Accesories']['All-Weather Interior Liners'])
        {
            currentPrice += pricingOptions['Accesories']['All-Weather Interior Liners'];
        }
        totalPriceElement.innerHTML = `$${currentPrice.toLocaleString()}`;
        updatePayments();
    }
    updateTotalPrice();
    const resizeHeader = ()=>{
        let atTop = null;
        if(window.scrollY === 0)
        {
            atTop = true;
        }
        else{
            atTop = false;
        }
        header.classList.toggle('visible', atTop);
        header.classList.toggle('hidden', !atTop);
    }
    window.addEventListener('scroll', ()=>{
        requestAnimationFrame(resizeHeader);
    })
})

const resetButton = document.getElementById('resetButton');
const errorMsg = document.getElementById('errmsg');

const qualityButton_q5 = document.getElementById('q5');
const qualityButton_q10 = document.getElementById('q10');
const qualityButton_q15 = document.getElementById('q15');
const qualityButton_q25 = document.getElementById('q25');
const qualityButton_q50 = document.getElementById('q50');

const qualityButtons = [
  { button: qualityButton_q5, value: 0.05 },
  { button: qualityButton_q10, value: 0.1 },
  { button: qualityButton_q15, value: 0.15 },
  { button: qualityButton_q25, value: 0.25 },
  { button: qualityButton_q50, value: 0.5 },
];

const activeClasses = ['button-set'];

let serviceQuality = 0;
let billAmountValue = 0;
let numPeopleValue = 0;

let billAmount = document.getElementById('billAmount');
let numPeople = document.getElementById('numPeople');

let tipAmount = document.getElementById('tipAmountValue');
let perPerson = document.getElementById('perPersonValue');

function setNumPeopleError() {
  errorMsg.classList.remove('hidden');
  errorMsg.setAttribute('aria-hidden', 'false');
  numPeople.setAttribute('aria-invalid', 'true');
}

function unsetNumPeopleError() {
  errorMsg.classList.add('hidden');
  errorMsg.setAttribute('aria-hidden', 'true');
  numPeople.setAttribute('aria-invalid', 'false');
}

function activateReset() {
  resetButton.classList.remove('bg-tc-green-750');
  resetButton.classList.add(
    'bg-tc-green-400',
    'hover:bg-tc-green-200',
    'hover:text-tc-green-900',
  );
}

function deactivateReset() {
  resetButton.classList.remove(
    'bg-tc-green-400',
    'hover:bg-tc-green-200',
    'hover:text-tc-green-900',
  );
  resetButton.classList.add('bg-tc-green-750');
}

function setTip() {
  activateReset();

  if (!(numPeopleValue > 0)) {
    numPeopleValue = 1;
  }
  tipAmount.innerText = String(
    ((billAmountValue * serviceQuality) / numPeopleValue).toFixed(2),
  );

  perPerson.innerText = String(
    (
      (billAmountValue + billAmountValue * serviceQuality) /
      numPeopleValue
    ).toFixed(2),
  );
}

billAmount?.addEventListener('input', function () {
  billAmountValue = Number(billAmount.value);
  if (isNaN(billAmountValue)) {
    billAmount.value = 0;
  } else {
    setTip();
  }
});

billAmount?.addEventListener('click', function () {
  billAmount.value = '';
});

numPeople?.addEventListener('blur', function () {
  numPeopleValue = Number(numPeople.value);
  if (numPeopleValue < 1) {
    setNumPeopleError();
    activateReset();
  } else {
    setTip();
  }
});

numPeople?.addEventListener('input', function () {
  numPeopleValue = Number(numPeople.value);
  unsetNumPeopleError();
  if (isNaN(numPeopleValue)) {
    setNumPeopleError();
    activateReset();
  } else {
    setTip();
  }
});

numPeople?.addEventListener('click', function () {
  numPeople.value = '';
});

resetButton?.addEventListener('click', function () {
  serviceQuality = 0;
  billAmount.value = '';
  numPeople.value = '';
  tipAmount.innerText = '0.00';
  perPerson.innerText = '0.00';
  billAmountValue = 0;
  numPeopleValue = 0;

  qualityButtons.forEach(({ button: btn }) => {
    btn?.classList.remove(...activeClasses);
  });

  unsetNumPeopleError();
  deactivateReset();
});

qualityButtons.forEach(({ button, value }) => {
  button?.addEventListener('click', () => {
    serviceQuality = value;

    qualityButtons.forEach(({ button: btn }) => {
      btn?.classList.remove(...activeClasses);
    });

    button.classList.add(...activeClasses);

    setTip();
  });
});

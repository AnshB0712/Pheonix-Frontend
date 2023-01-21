const PAYTM_GATEWAY_URL =`${import.meta.env.VITE_PAYTM_URL}/theia/api/v1/showPaymentPage?mid=${import.meta.env.VITE_PAYTM_MID}&orderId=`;

function buildForm(data) {
  const form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('name','paytm');
  form.setAttribute('id','paytmForm');
  form.setAttribute('action', `${PAYTM_GATEWAY_URL}${data.orderId}`);

  Object.keys(data).forEach(key => {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', key);
    input.setAttribute('value', (data[key]));
    form.appendChild(input);
  });

  const MID_input = document.createElement('input');
  MID_input.setAttribute('type', 'text');
  MID_input.setAttribute('name', 'mid');
  MID_input.setAttribute('value', import.meta.env.VITE_PAYTM_MID);
  form.appendChild(MID_input);

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  form.appendChild(submit);

  return form;
}

export const loadDynamicScript = (data) => {
  const paytmForm = buildForm(data);
  document.body.appendChild(paytmForm);
  paytmForm.submit();
};

export const removeAppendedScript = () => {
  const existingForm = document.getElementById('paytmForm');

  if (existingForm) {
    existingForm.remove();
  }
};

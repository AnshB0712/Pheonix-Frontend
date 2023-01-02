import { onScriptLoad } from './checkout';

export const loadDynamicScript = (data,dispatch) => {
  const existingScript = document.getElementById('Paytm');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src =  'https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/' + import.meta.env.VITE_PAYTM_MID + '.js';
    script.id = 'Paytm';
    document.body.appendChild(script);

    script.onload = () => {
      onScriptLoad(data,dispatch);
    };
  }

  if (existingScript) {
    onScriptLoad(data,dispatch);
  }
};

export const removeAppendedScript = () => {
  const existingScript = document.getElementById('Paytm');

  if (existingScript) {
    existingScript.remove();
  }
};

import { onScriptLoad } from './checkout';

export const loadDynamicScript = (data,stopLoadingUI) => {
  const existingScript = document.getElementById('Paytm');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src =  'https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/' + import.meta.env.VITE_PAYTM_MID + '.js';
    script.id = 'Paytm';
    document.body.appendChild(script);

    script.onload = () => {
      onScriptLoad(data,stopLoadingUI);
    };
  }

  if (existingScript) {
    onScriptLoad(data,stopLoadingUI);
  }
};

export const removeAppendedScript = () => {
  const existingScript = document.getElementById('Paytm');

  if (existingScript) {
    existingScript.remove();
  }
};

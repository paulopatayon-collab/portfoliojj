const lang = navigator.language ? navigator.language : 'en';
  window.canva_installFooter = (container) => {
    if (!(container instanceof HTMLDivElement)) {
      return;
    }
    fetch('_footer?lang=' + encodeURIComponent(lang)).then(response => {
      if (response.status !== 200) {
        return;
      }
      response.text().then(footerStr => {
        container.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = footerStr;
        for (const child of [...div.children]) {
          if (child.tagName.toLowerCase() !== 'script') {
            container.append(child);
          }
        }

        (() => { !function(){"use strict";const t={active:"active"},o={modalBackdrop:"modal_backdrop",termsAndConditionsModal:"modal",termsAndConditionsModalCloseButton:"form_close_initial",reportButton:"form_report",privacyPolicyModal:"privacy_policy_modal",privacyPolicyModalCloseButton:"form_close_privacy_policy",termsAndSupportFooterButton:"report_button",privacyPolicyFooterButton:"privacy_policy_button"};!function(){const c=document.getElementById(o.modalBackdrop);null!=c&&(function(c){const e=document.getElementById(o.termsAndConditionsModal),n=document.getElementById(o.termsAndConditionsModalCloseButton),l=document.getElementById(o.reportButton),i=document.getElementById(o.termsAndSupportFooterButton);if(null==e||null==n||null==l||null==i)return;l.onclick=()=>{const{origin:t,pathname:o}=window.location,c=t+o,e=l.dataset.reportUrl+encodeURIComponent(c);window.open(e)};const s=()=>{c.classList.remove(t.active),e.classList.remove(t.active),i.classList.remove(t.active),i.focus(),c.onclick=null};n.onclick=s,i.onclick=()=>{c.classList.add(t.active),c.onclick=s,e.classList.add(t.active),i.classList.add(t.active)}}(c),function(c){const e=document.getElementById(o.privacyPolicyModal),n=document.getElementById(o.privacyPolicyModalCloseButton),l=document.getElementById(o.privacyPolicyFooterButton);if(null==e||null==n||null==l)return;const i=()=>{c.classList.remove(t.active),e.classList.remove(t.active),l.classList.remove(t.active),l.focus(),c.onclick=null};n.onclick=i,l.onclick=()=>{c.classList.add(t.active),c.onclick=i,e.classList.add(t.active),l.classList.add(t.active)}}(c))}()}(); })();
      });
    });
  }

function sendMessage(message){
  const mainEl = document.querySelector('#main')
  const textareaEl = mainEl.querySelector('div[contenteditable="true"]')

  if(!textareaEl) {
    throw new Error('There is no opened conversation')
  }

  textareaEl.focus()
  document.execCommand('insertText', false, message)
  textareaEl.dispatchEvent(new Event('change', { bubbles: true }))

  setTimeout(() => {
    (mainEl.querySelector('[data-testid="send"]') || mainEl.querySelector('[data-icon="send"]')).click()
  }, 100)
}



const selectMessage = () => {
  const messages = Array.from(
    document.querySelectorAll(
      'span[aria-label^="Ayman:"] + div .selectable-text span'
    )
  ).map(el => el.innerText.trim());
  
  console.log(`Received message: ${messages[messages.length - 1]}`);
  sendMessage(messages[messages.length - 1]);
};

selectMessage();

const observer = new MutationObserver(selectMessage);
observer.observe(document.body, { childList: true, subtree: true });

(function() {
    if(document.querySelector('.cc-bh')) return false;
    window.__cc_iv = false;
    const dqc = document.querySelector.bind(document);
    let toggleCC = function() {
        window.__cc_iv = !window.__cc_iv;
        dqc('.chat-room').style.setProperty('display', (window.__cc_iv ? 'none' : 'flex'), 'important');
        dqc('.cc-eh').style.setProperty('display', (window.__cc_iv ? 'flex' : 'none'), 'important');
        dqc('#chat-room-header-label').innerHTML = (window.__cc_iv ? 'CROWD CONTROL' : 'STREAM CHAT');
        dqc('.cc-bh').style.setProperty('background', (window.__cc_iv ? '#030' : 'transparent'))
    }

    let channelId = null;
    window.__APOLLO_CLIENT__.queryManager.queries.forEach((value) => {
        if(value.variables.hasOwnProperty('channelID') && channelId === null){
            channelId = value.variables.channelID
        }
    });

    let styles=`.channel-root__info--with-chat .channel-info-content, .channel-root--watch-chat+.persistent-player {width: 100% !important} .right-column:not(.right-column--collapsed), .channel-root__right-column {width:45rem !important} .channel-root__right-column--collapsed {transform:translateX(-45rem) translateZ(0px) !important} .channel-root__right-column--expanded, .toggle-visibility__right-column--expanded {transform:none !important}`;
    let styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)

    let section = document.createElement('section');
    section.classList.add('cc-eh');
    section.setAttribute('style','flex:1 !important;width:100% !important;display:none !important');

    let iframe = document.createElement('iframe');
    iframe.src = `https://interact.crowdcontrol.live/#/twitch/${channelId}/coins`;
    iframe.setAttribute('style','width:100%;height:100%');
    section.appendChild(iframe);
    dqc('.stream-chat').appendChild(section);

    let buttonGroup = document.querySelector('.stream-chat-header button:first-of-type').parentNode;
    buttonGroup.querySelector('button').addEventListener('click', function() {if(window.__cc_iv) toggleCC()}, false);

    let clonedElement = buttonGroup.cloneNode(true);
    clonedElement.classList.add('cc-bh');
    let button = clonedElement.querySelector('button');
    button.addEventListener('click', toggleCC, false);
    button.style.width = "auto";
    button.innerHTML = '<img src="https://crowdcontrol.live/wp-content/themes/crowd-control/dist/assets/images/logo/horizontal/logo-horizontal.png" height="24">'

    buttonGroup.parentNode.insertBefore(clonedElement, buttonGroup);
})()
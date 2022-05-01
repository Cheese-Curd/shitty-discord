document.addEventListener('click', e =>
{
    if (e.target.tagName == 'SWITCH')
    {
		e.preventDefault();
        var newState;
        if (e.target.getAttribute('state') == 'on')
        {
            e.target.setAttribute('state', 'off');
            newState = false;
        }
        else
        {
            e.target.setAttribute('state', 'on');
            newState = true;
        }
        const ToggleEvent = new CustomEvent('toggle', { "detail":{"state":newState} });
        e.target.dispatchEvent(ToggleEvent);
        e.target.setAttribute('transitioning', 'true');
        setTimeout(() => e.target.setAttribute('transitioning', 'false'), 100);
    }
});
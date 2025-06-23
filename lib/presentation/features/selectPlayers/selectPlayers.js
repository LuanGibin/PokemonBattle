document.querySelectorAll('.player').forEach(span => {
    span.addEventListener('click', function handleClick() {
        // Evita múltiplos inputs abertos
        if (span.querySelector('input')) return;

        const currentName = span.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.maxLength = 14;
        input.style.width = '90px';
        input.autofocus = true;

        // Substitui o span pelo input
        span.textContent = '';
        span.appendChild(input);
        input.focus();

        // Função para salvar o novo nome
        function save() {
            let newName = input.value.trim();
            if (newName === '') newName = currentName;
            span.textContent = newName;
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                save();
            }
            if (e.key === 'Escape') {
                span.textContent = currentName;
            }
        });

        //"blur, save" em input serve para salvar ao perder o foco (sair da caixa do imput)
        input.addEventListener('blur', save);
    });
});


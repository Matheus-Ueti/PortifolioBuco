// Configuração do EmailJS
(function() {
    // Inicialização do EmailJS com verificação de erro
    try {
        emailjs.init({
            publicKey: "8CKotcCpuW0RiXlOO"
        });
        console.log("EmailJS inicializado com sucesso");
    } catch (error) {
        console.error("Erro ao inicializar EmailJS:", error);
    }
})();

// Função para validar o formulário
function validateForm(form) {
    const requiredFields = ['name', 'email', 'phone', 'message'];
    for (const field of requiredFields) {
        const element = form.querySelector(`#${field}`);
        if (!element || !element.value.trim()) {
            alert(`Por favor, preencha o campo ${field}`);
            return false;
        }
    }
    return true;
}

// Função para enviar email
function handleEmailSend(e) {
    e.preventDefault();

    const form = document.getElementById('contact-form');
    if (!form || !validateForm(form)) return false;

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return false;

    // Desabilita o botão e mostra loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

    // Prepara os parâmetros de forma simplificada
    const templateParams = {
        from_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Envia o email usando as novas credenciais
    emailjs.send('service_zmh3eeh', 'template_3fkhlq9', templateParams)
        .then(function(response) {
            console.log('Email enviado com sucesso:', response);
            alert('Mensagem enviada com sucesso!');
            form.reset();
        })
        .catch(function(error) {
            console.error('Erro ao enviar email:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar Mensagem';
        });

    return false;
}

// Adiciona o evento quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleEmailSend);
    }

    // Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
});

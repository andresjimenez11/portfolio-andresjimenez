export function setupFormValidation() {
    const form = document.getElementById('contact-form');
    const errorContainer = document.getElementById('form-errors');

    const campos = {
        nombre: { selector: 'input[name="nombre"]', minLength: 3, etiqueta: "Nombre" },
        email: { selector: 'input[name="email"]', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, etiqueta: "Email" },
        telefono: { selector: 'input[name="telefono"]', regex: /^\d{7,}$/, etiqueta: "Teléfono" },
        asunto: { selector: 'input[name="asunto"]', minLength: 3, etiqueta: "Asunto" },
        mensaje: { selector: 'textarea[name="mensaje"]', minLength: 10, etiqueta: "Mensaje" }
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const errores = [];

        for (const campo in campos) {
            const { selector, minLength, regex, etiqueta } = campos[campo];
            const input = form.querySelector(selector);
            const valor = input.value.trim();

            const nombreCampo = etiqueta || campo;

            if (!valor) {
                errores.push(`• El campo <strong>${nombreCampo}</strong> no puede estar vacío.`);
                continue;
            }

            if (minLength && valor.length < minLength) {
                errores.push(`• El campo <strong>${nombreCampo}</strong> debe tener al menos ${minLength} caracteres.`);
            }

            if (regex && !regex.test(valor)) {
                errores.push(obtenerMensajeFormato(campo));
            }
        }

        mostrarErrores(errores, errorContainer);
        if (errores.length === 0) form.submit();
    });

    function obtenerMensajeFormato(campo) {
        switch (campo) {
            case 'email': return "• El campo <strong>Email</strong> no es válido.";
            case 'telefono': return "• El campo <strong>Teléfono</strong> debe contener solo números y al menos 7 dígitos.";
            default: return `• El campo <strong>${campo}</strong> tiene un formato inválido.`;
        }
    }

    function mostrarErrores(errores, errorContainer) {
        errorContainer.innerHTML = errores.map(err => `<p>${err}</p>`).join("");
        errorContainer.style.display = errores.length ? "block" : "none";
        errorContainer.classList.toggle("show", errores.length > 0);
    }
}

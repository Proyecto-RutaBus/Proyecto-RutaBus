const LoginForm = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


INSERT INTO `users` (`id`, `username`, `email`, `password`, `isAdmin`, `picture`, `bio`, `createdAt`, `updatedAt`) VALUES
(2, 'Baby Boss', 'admin@email.com', '$2b$10$orsxbO18mR1u8J/nV2et4.s3JhohwFs2RXmM0wENRPupgqzgry5zK', 0, 'http://localhost:3000/images/admin.jpg1666707792261.jpg', 'Bonjour tout le monde ! Je suis l\'administrateur de Groupomania !', '2022-10-25 14:22:24', '2022-10-25 14:23:12');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

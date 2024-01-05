-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-01-2024 a las 22:12:45
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `universidad`
--
CREATE DATABASE IF NOT EXISTS `universidad` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE `universidad`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`id`, `nombre`) VALUES
(5, 'Administración de Empresas'),
(4, 'Contaduría Pública'),
(3, 'Derecho'),
(1, 'Ingeniería de Computación'),
(2, 'Ingeniería Industrial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catedras`
--

CREATE TABLE `catedras` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estudiantes` int(20) NOT NULL,
  `profesor` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `catedras`
--

INSERT INTO `catedras` (`id`, `nombre`, `estudiantes`, `profesor`) VALUES
(1, 'Lógica Básica', 0, 'Roberto Di Michelle'),
(2, 'Estructura de Datos', 0, 'Yerson Gonzalez'),
(3, 'Base de Datos', 0, 'Katiuska Morillo'),
(4, 'Backend', 0, NULL),
(5, 'Matematica Financiera', 0, NULL),
(6, 'Matematica 0', 0, 'Liliana Rivera'),
(8, 'Derecho Penal', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catedra_estudiantes`
--

CREATE TABLE `catedra_estudiantes` (
  `id` int(11) NOT NULL,
  `catedra` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `estudiante` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `departamento` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `cargo` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `sede` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `departamento`, `cargo`, `sede`) VALUES
(1, 'Karelis Paredes', 'Rectorado', 'Rectora', 'Estovacuy'),
(3, 'Saida Kazar', 'Rectorado', 'Vicerectora', 'Mirabel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `edad` int(3) NOT NULL,
  `carrera` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombre`, `edad`, `carrera`) VALUES
(12, 'Luis Montenegros', 18, 'Ingeniería de Computación'),
(13, 'Luis Balza', 18, 'Ingeniería de Computación'),
(14, 'Luis Guerrero', 19, 'Ingeniería Industrial'),
(15, 'Samuel Guerrero', 19, 'Ingeniería Industrial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `sede` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `fecha`, `sede`) VALUES
(2, 'Prueba del Metaverso', '2024-01-26', 'Estovacuy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_empleados`
--

CREATE TABLE `eventos_empleados` (
  `id` int(11) NOT NULL,
  `evento` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `empleado` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_estudiantes`
--

CREATE TABLE `eventos_estudiantes` (
  `id` int(11) NOT NULL,
  `evento` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `estudiante` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_profesores`
--

CREATE TABLE `eventos_profesores` (
  `id` int(11) NOT NULL,
  `evento` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `profesor` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `edad` int(20) NOT NULL,
  `catedra` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id`, `nombre`, `edad`, `catedra`) VALUES
(2, 'Roberto Di Michelle', 40, 'Lógica Básica'),
(3, 'Yerson Gonzalez', 42, 'Estructura de Datos'),
(4, 'Katiuska Morillo', 45, 'Base de Datos'),
(5, 'Liliana Rivera', 38, 'Matematica 0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `ubicacion` varchar(1000) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`id`, `nombre`, `ubicacion`) VALUES
(1, 'Estovacuy', 'San Rafael de Carvajal, El Filo'),
(3, 'Mirabel', 'Valera, Plata I');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8_spanish2_ci NOT NULL,
  `rol` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `rol`) VALUES
(1, 'luis26', '$2b$10$D8HEu3QyLzQZE6fQJfwsK.SYKoxYiXC3l/dNezjFWDErTarGakUI2', 'admin'),
(2, 'luis25', '$2b$10$GCbjuMYA16d7PBxN1Nq6RuFKMVcmzw6asJzal8U8yEcJtIettM4wq', 'editor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`) USING BTREE;

--
-- Indices de la tabla `catedras`
--
ALTER TABLE `catedras`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_2` (`nombre`),
  ADD KEY `nombre` (`nombre`);

--
-- Indices de la tabla `catedra_estudiantes`
--
ALTER TABLE `catedra_estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `catedra` (`catedra`),
  ADD KEY `estudiante` (`estudiante`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relacion_sede` (`sede`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relacion_carrera` (`carrera`),
  ADD KEY `nombre` (`nombre`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relacion_sede_evento` (`sede`),
  ADD KEY `titulo` (`titulo`);

--
-- Indices de la tabla `eventos_empleados`
--
ALTER TABLE `eventos_empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos_estudiantes`
--
ALTER TABLE `eventos_estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evento` (`evento`),
  ADD KEY `estudiante` (`estudiante`);

--
-- Indices de la tabla `eventos_profesores`
--
ALTER TABLE `eventos_profesores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evento` (`evento`),
  ADD KEY `profesor` (`profesor`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nombre` (`nombre`),
  ADD KEY `relacion_catedra` (`catedra`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carreras`
--
ALTER TABLE `carreras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `catedras`
--
ALTER TABLE `catedras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `catedra_estudiantes`
--
ALTER TABLE `catedra_estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `eventos_empleados`
--
ALTER TABLE `eventos_empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_estudiantes`
--
ALTER TABLE `eventos_estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_profesores`
--
ALTER TABLE `eventos_profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `catedra_estudiantes`
--
ALTER TABLE `catedra_estudiantes`
  ADD CONSTRAINT `catedra` FOREIGN KEY (`catedra`) REFERENCES `catedras` (`nombre`) ON DELETE CASCADE,
  ADD CONSTRAINT `estudiante` FOREIGN KEY (`estudiante`) REFERENCES `estudiantes` (`nombre`) ON DELETE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `relacion_sede` FOREIGN KEY (`sede`) REFERENCES `sedes` (`nombre`);

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `relacion_carrera` FOREIGN KEY (`carrera`) REFERENCES `carreras` (`nombre`);

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `relacion_sede_evento` FOREIGN KEY (`sede`) REFERENCES `sedes` (`nombre`);

--
-- Filtros para la tabla `eventos_estudiantes`
--
ALTER TABLE `eventos_estudiantes`
  ADD CONSTRAINT `relacion_estudiante` FOREIGN KEY (`estudiante`) REFERENCES `estudiantes` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relacion_evento` FOREIGN KEY (`evento`) REFERENCES `eventos` (`titulo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `relacion_catedra` FOREIGN KEY (`catedra`) REFERENCES `catedras` (`nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

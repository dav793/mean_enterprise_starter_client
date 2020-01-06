/**
 *  http://www.felaban.com/lvdo/cap4_definicion.html#act
 *
 *  risk1: Alto flujo de efectivo
 *  risk2: Administración de fondos de terceros
 *  risk3: Actividad enlistada como APNFD
 *  risk4: Anonimato de transacciones
 *  risk5: Enlistada en boletin UIF
 *  risk6: Enlistada en Recomendaciones del GAFI
 *  risk7: Relacionada con actividades sensibles
 *  risk8: Relaciones con el exterior
 *  risk9: Actividad Regulada
 */

const list = [
    {id:"1",name: "Abogados y contadores públicos que ejerzan en forma liberal",risk1:1,risk2:2,risk3:2,risk4:2,risk5:2,risk6:2,risk7:2,risk8:2,risk9:1,riskSum:16,riskLevel:4},
    {id:"2",name: "Actividades Agricolas y Ganaderas",risk1:0,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:3,riskLevel:2},
    {id:"3",name: "Administrador de Fondos de Terceros, Scrow, Trust, Title etc.",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"4",name: "Agencias de bienes raíces",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"5",name: "Agencias de viajes",risk1:0,risk2:1,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:1,risk9:0,riskSum:5,riskLevel:3},
    {id:"6",name: "Almacenes de depósito",risk1:1,risk2:1,risk3:0,risk4:0,risk5:1,risk6:1,risk7:0,risk8:1,risk9:0,riskSum:5,riskLevel:3},
    {id:"7",name: "Apuestas electrónicas o por otro medio",risk1:1,risk2:0,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"8",name: "Asalariados sector privado",risk1:0,risk2:0,risk3:0,risk4:0,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:2,riskLevel:1},
    {id:"9",name: "Asociaciones de ahorro y crédito (reguladas)",risk1:1,risk2:1,risk3:1,risk4:0,risk5:1,risk6:1,risk7:1,risk8:0,risk9:-2,riskSum:4,riskLevel:2},
    {id:"10",name: "Casinos físicos y/o virtuales",risk1:1,risk2:0,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"11",name: "Compañías fiduciarias no bancarias",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"12",name: "Compañías fiduciarias (reguladas)",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:0,risk9:-2,riskSum:4,riskLevel:2},
    {id:"13",name: "Compra y venta de bienes inmuebles",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"14",name: "Compraventa de joyas, piedras y materiales preciosos",risk1:1,risk2:0,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"15",name: "Compraventa de obras de arte y antigüedades",risk1:0,risk2:0,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:0,risk9:0,riskSum:5,riskLevel:3},
    {id:"16",name: "Compraventa de vehículos nuevos o/y usados",risk1:1,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:6,riskLevel:4},
    {id:"17",name: "Concesionarios de medios de transporte, barcos, aviones, automóviles",risk1:0,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:3,riskLevel:2},
    {id:"18",name: "Cooperativas de crédito (reguladas)",risk1:0,risk2:1,risk3:1,risk4:0,risk5:1,risk6:1,risk7:1,risk8:0,risk9:-2,riskSum:3,riskLevel:2},
    {id:"19",name: "Desarrolladores inmobiliarios",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"20",name: "E-commerce (ventas por internet)",risk1:0,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:5,riskLevel:3},
    {id:"21",name: "Empresario de diversos sectores de alto riesgo",risk1:1,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:1,riskSum:9,riskLevel:4},
    {id:"22",name: "Empresario de diversos sectores de bajo riesgo",risk1:1,risk2:0,risk3:0,risk4:0,risk5:0,risk6:0,risk7:0,risk8:0,risk9:0,riskSum:1,riskLevel:1},
    {id:"23",name: "Empresas de arrendamiento financiero",risk1:0,risk2:1,risk3:0,risk4:1,risk5:1,risk6:1,risk7:1,risk8:0,risk9:0,riskSum:5,riskLevel:3},
    {id:"24",name: "Empresas de comercio exterior, importaciones, exportaciones",risk1:0,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:1,risk9:0,riskSum:4,riskLevel:2},
    {id:"25",name: "Empresas de factoraje",risk1:0,risk2:1,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:4,riskLevel:2},
    {id:"26",name: "Empresas farmacéuticas por internet no reconocidas",risk1:0,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:5,riskLevel:3},
    {id:"27",name: "Empresas farmacéuticas reconocidas",risk1:1,risk2:0,risk3:0,risk4:0,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:3,riskLevel:2},
    {id:"28",name: "Fabricación venta y distribución de armas",risk1:0,risk2:0,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:0,risk9:0,riskSum:5,riskLevel:3},
    {id:"29",name: "Funcionarios Públicos no PEPs",risk1:0,risk2:0,risk3:0,risk4:0,risk5:1,risk6:1,risk7:1,risk8:0,risk9:0,riskSum:3,riskLevel:2},
    {id:"30",name: "Fundaciones de caridad o no lucrativas ONGs",risk1:0,risk2:1,risk3:0,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:6,riskLevel:4},
    {id:"31",name: "Hoteles no pertenecientes a cadenas reconocidas",risk1:1,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:4,riskLevel:2},
    {id:"32",name: "Inst. Financieras no bancarias: casas de cambio, remesadoras, financieras, intermediarios financieros",risk1:1,risk2:1,risk3:1,risk4:0,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"33",name: "Inversionistas sin actividad económica definida",risk1:0,risk2:1,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:1,risk9:0,riskSum:5,riskLevel:3},
    {id:"34",name: "Medios alternativos de transferencias financieras",risk1:1,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:8,riskLevel:4},
    {id:"35",name: "Moteles / nigth clubs",risk1:1,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:4,riskLevel:2},
    {id:"36",name: "Negocios con alto volumen de transacciones con dinero en efectivo: diversiones, restaurantes, tiendas al detalle, etc.",risk1:1,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:1,risk8:0,risk9:0,riskSum:5,riskLevel:3},
    {id:"37",name: "Operadores de tarjetas de crédito que no formen parte de un grupo financiero",risk1:1,risk2:0,risk3:1,risk4:0,risk5:1,risk6:1,risk7:1,risk8:0,risk9:0,riskSum:5,riskLevel:3},
    {id:"38",name: "Organizaciones religiosas",risk1:1,risk2:1,risk3:0,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"39",name: "Otras actividades de bajo riesgo: Administrador, Ama de casa, Arquitecto, Artista, Chofer, Constructor, Empleada doméstica, Economista, Enfermero, Estudiante, Informático, Ingeniero, Médico, Mensajero, Odontólogo, Químico o Físico, Operario Industrial, Peluquero, Pensionado, Periodista, Piloto, Profesor o Maestro, Psicólogo, Trabajador Social, Veterinario",risk1:0,risk2:0,risk3:0,risk4:0,risk5:1,risk6:1,risk7:0,risk8:0,risk9:0,riskSum:2,riskLevel:1},
    {id:"40",name: "Personas físicas y jurídicas acreedores de operaciones crediticias de cualquier índole",risk1:0,risk2:0,risk3:1,risk4:0,risk5:1,risk6:1,risk7:1,risk8:0,risk9:0,riskSum:4,riskLevel:2},
    {id:"41",name: "Transporte de Carga Pesada",risk1:0,risk2:0,risk3:0,risk4:1,risk5:1,risk6:1,risk7:0,risk8:1,risk9:0,riskSum:4,riskLevel:2},
    {id:"42",name: "Venta de artículos de cuero y pieles",risk1:1,risk2:0,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"43",name: "Venta de moneda virtual",risk1:0,risk2:1,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:7,riskLevel:4},
    {id:"44",name: "Venta de piezas de maquinaria pesada y transporte",risk1:0,risk2:0,risk3:1,risk4:1,risk5:1,risk6:1,risk7:1,risk8:1,risk9:0,riskSum:6,riskLevel:4}
];

class EconomicActivitiesUtility {

    constructor() { }

    getList(): {
        id: string,
        name: string,
        risk1: number,
        risk2: number,
        risk3: number,
        risk4: number,
        risk5: number,
        risk6: number,
        risk7: number,
        risk8: number,
        risk9: number,
        riskSum: number,
        riskLevel: number
    }[] {
        return list;
    }

    getOptionsList(): {key: string, label: string}[] {
        return this.getList().map(elem => ({key: elem.id, label: elem.name}));
    }

}

export const EconomicActivities = new EconomicActivitiesUtility();

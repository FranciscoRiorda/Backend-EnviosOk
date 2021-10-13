 const getMenuFrontEnd = (role = 'USER_ROLE') => {

     const menu = [{
             titulo: 'Gestión de pedidos',
             icono: 'mdi mdi-gauge',
             submenu: [

                 { titulo: 'Envíos', url: 'envios' },
                 { titulo: 'Gastos', url: 'gastos' },
                 { titulo: 'Pedidos', url: 'pedidos' }

             ]
         },

         {
             titulo: 'Registros',
             icono: 'mdi mdi-calendar',
             submenu: [

                 //   {titulo: 'Balances del mes', url: 'balance'},
                 //   {titulo: 'Histórico', url: 'historico'},
                 //   {titulo: 'Rendimientos', url: 'rendimientos'}

             ]
         },

         {
             titulo: 'Mantenimientos',
             icono: 'mdi mdi-folder-lock-open',
             submenu: [

                 { titulo: 'Clientes', url: 'clientes' },
                 //{titulo: 'Usuarios', url: 'usuarios'},

             ]
         }
     ];

     if (role === 'ADMIN_ROLE') {
         menu[1].submenu.unshift({ titulo: 'Balances del mes', url: 'balance' }, { titulo: 'Histórico', url: 'historico' }, { titulo: 'Rendimientos', url: 'rendimientos' });
         menu[2].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
     }
     return menu;
 };

 module.exports = {
     getMenuFrontEnd
 }
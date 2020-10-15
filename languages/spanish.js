const { emojis, discord } = require("../config");

module.exports = {

    locale: "es_ES",

    utils: {
        prefix: (prefix) => `¡Buenos dias! ¡Utilice **${prefix}help** para ver todos los comandos! Puedes agregarme a tu servidor con **${prefix}add**.`,
        viewConf: () => `[Ver la configuración en el tablero](https://delta-bot.com)`,
        conf: {
            title: () => `Ver la configuración en el tablero`,
            content: () => `[o en el tablero](https://delta-bot.com)`
        },
        specialMessages: {
            join: {
                oauth2: (user) => `${user} se unió al servidor a través de OAuth.`,
                vanity: (user) => `${user} se unió al servidor usando una invitación discord.gg establecida por el propietario del servidor (o un administrador).`,
                unknown: (user) => `No puedo encontrar cómo ${user} se unió al servidor.`,
                perm: (user) => `${emojis.error} | Necesito los permisos para administrar el servidor para saber quién invitó ${user}.`
            },
            leave: {
                oauth2: (user) => `${user} abandonó el servidor al que se había unido a través de OAuth.`,
                vanity: (user) => `${user} abandonó el servidor al que se había unido usando una invitación discord.gg establecida por el propietario del servidor (o un administrador).`,
                unknown: (user) => `${user} dejó el servidor, pero no puedo encontrar cómo se unió a él.`
            }
        }
    },

    errors: {
        missingPerms: (neededPermissions) => `__**${emojis.error} Permisos faltantes**__\n\nNecesito los siguientes permisos para que este comando funcione correctamente: ${neededPermissions.map((p) => "`"+p+"`").join(", ")}`,
        disabled: () => `${emojis.error} | Este comando está actualmente deshabilitado !`,
        permLevel: (name) => `${emojis.error} | Este comando requiere el nivel de autorización : \`${name}\`!`,
        sendPerm: () => `${emojis.error} | No tengo permiso para enviar mensajes en esta sala. !`
    },

    help: {
        title: () => `ℹ Página de ayuda de InviteMember`,
        description: (guildName, prefix) => `● Prefijo en **${guildName}** : \`${prefix}\` (\`${prefix}setprefix\`)\n● Idioma en **${guildName}** : \`Spanish\` (\`${prefix}setlang\`)`,
        // Admin
        admin: {
            title: () => `<:delta_administration:739611028593049702> Comandos de administrador`,
            content: (prefix) => "`"+ prefix +"addbonus`,`"+ prefix +"removebonus`,`"+ prefix +"sync-invites`,`"+ prefix +"removeinvites`,`"+ prefix +"restoreinvites`"},
        // Ranks
        ranks: {
            title: () => `:gift: Órdenes de recompensa`,
            content: (prefix) => "`"+ prefix +"addrank`,`"+ prefix +"removerank`,`"+ prefix +"ranks`"},
        // Join DM Messages
        joinDM: {
            title: () => `:envelope_with_arrow: Mensajes de llegada en PM`,
            content: (prefix) => "`"+ prefix +"configdm`,`"+ prefix +"setdm`,`"+ prefix +"testdm`"},
        // Join Messages
        join: {
            title: () => `:incoming_envelope: Mensajes de llegada`,
            content: (prefix) => "`"+ prefix +"configjoin`,`"+ prefix +"setjoin`,`"+ prefix +"testjoin`"},
        // Leave Messages
        leave: {
            title: () => `:envelope: Mensajes de salida`,
            content: (prefix) => "`"+ prefix +"configleave`,`"+ prefix +"setleave`,`"+ prefix +"testleave`"},
        // Invites
        invites: {
            title: () => `:wave: Invitations`,
            content: (prefix) => "`"+ prefix +"invite`,`"+ prefix +"leaderboard`"},
        // ManageInvite
        manageInvite: {
            title: () => `:boom: InviteMember`,
            content: (prefix) => "`"+ prefix +"membercount`,`"+ prefix +"userinfo`,`"+ prefix +"botinfos`,`"+ prefix +"ping`,`"+ prefix +"partners`,`"+ prefix +"creators`,`"+ prefix +"support`,`"+ prefix +"add`"},
        // Others
        tip: (prefix) => `Consejo: puedes ver tu configuración con el comando ${prefix}config`,
        links: (clientID) => `[Agrégame](https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=bot) ● [Sitio web](https://delta-bot.com) ● [Servidor de soporte](${discord}) ● [Vota por mí](https://discord.boats/bot/${clientID}/vote) ● [Twitter](https://twitter.com/DeltaBotInc)`
    },

    botinfos: {
        author: (username) => `Estadísticas ${username}`,
        // Statistics
        statistics: {
            title: () => `📊 Estadísticas`,
            content: (guilds, users, channels) => `\`Servidores: ${guilds}\`\n\`Asuntos de negocios: ${channels}\`\n\`Usuarios: ${users}\``
        },
        // Versions
        versions: {
            title: () => `⚙️ Versiones`,
            content: (djs, node) => `\`Discord: v${djs}\`\n\`Node: ${node}\``
        },
        // Shard
        shard: {
            title: (shardID, current) => `${emojis.online} Shard #${shardID} ${current ? `(actual)` : ""}`,
            content: (guilds, ping, ram) => `
            \`${guilds}\` servidores
            \`${ping}\` ms
            \`${ram}\` mb ram`
        }
    },

    invite: {
        description: (member, memberData, isYou, nextRank, role) => `${isYou ? `Teneis` : `**${member.user.username}** a`} **${memberData.invites + memberData.bonus - memberData.leaves - memberData.fake}** invitaciones! (**${memberData.invites}** ordinario, **${memberData.bonus}** bonificación, **${memberData.fake > 0 ? `-${memberData.fake}` : `${memberData.fake}`}** falso, **${memberData.leaves > 0 ? `-${memberData.leaves}` : `${memberData.leaves}`}** ido)${nextRank ? `\nTodavía necesitas **${nextRank.inviteCount - (memberData.invites + memberData.bonus - memberData.leaves - memberData.fake)}** invitaciones para alcanzar el rango **${role}** !` : ""}`
    },

    leaderboard: {
        cleared: () => `${emojis.success} | Clasificación eliminada !`,
        user: (user, member, lb) => `${lb} **${user.username}** - **${member.calculatedInvites}** invitaciones (**${member.invites}** ordinario, **${member.bonus}** bonificación, **${member.fake > 0 ? `-${member.fake}` : `${member.fake}`}** falso, **${member.leaves > 0 ? `-${member.leaves}` : `${member.leaves}`}** ido)`,
        prompt: () => `{{user}}, a que pagina quieres ir ? Escribir \`cancel\` o \`0\` por cancelar.`,
        title: () => `Ranking de invitaciones`,
        empty: {
            title: () => `😕 No se encontró ninguna invitación`,
            content: () => `Comienza a invitar personas y aparecerás en esta página. !`
        }
    },

    userinfo: {
        title: (user) => `Cuenta ${user.tag} (${user.id})`,
        fields: {
            // user
            createdAt: {
                title: () => `Creación`
            },
            bot: {
                title: () => `Robot`,
                content: (user) => user.bot ? "Si" : "No"
            },
            // member
            joinedAt: {
                title: () => `Llegada`
            },
            joinWay: {
                title: () => `Llegada gracias a`,
                oauth: () => `Invitación de Oauth2 (via discordapp.com).`,
                vanity: () => `Invitación personalizada configurada por un administrador.`,
                unknown: (user) => `No se pudo determinar cómo ${user.username} se unió al servidor.`,
                invite: (user) => user.tag
            },
            invites: {
                title: () => `Invitaciones`,
                content: (inviteData) => `**${inviteData.invites + inviteData.bonus - inviteData.leaves - inviteData.fake}** invitaciones (**${inviteData.invites}** ordinario, **${inviteData.bonus}** bonificación, **${inviteData.fake > 0 ? `-${inviteData.fake}` : `${inviteData.fake}`}** falso, **${inviteData.leaves > 0 ? `-${inviteData.leaves}` : `${inviteData.leaves}`}** ido)`
            },
            joinOrder: {
                title: () => `Orden de llegadas`,
                content: (previous, next, user) => `${previous ? `**${previous.tag}** > ` : ""}**${user.tag}**${next ? ` > **${next.tag}**` : ""}`
            }
        }
    },

    membercount: {
        title: (guildName) => `Número de miembros ${guildName}`,
        description: (guild) => `
        Un total de **${guild.members.cache.size}** miembros (**${guild.members.cache.filter((m) => !m.user.bot).size}** humanos y **${guild.members.cache.filter((m) => m.user.bot).size}** bots)

        ➔ ${emojis.dnd} | ${guild.members.cache.filter((m) => m.presence.status === "dnd"  && !m.user.bot).size} miembros (no molestar)
        ➔ ${emojis.online} | ${guild.members.cache.filter((m) => m.presence.status === "online" && !m.user.bot).size} miembros (en línea)
        ➔ ${emojis.idle} | ${guild.members.cache.filter((m) => m.presence.status === "idle" && !m.user.bot).size} miembros (afk)
        ➔ ${emojis.offline} | ${guild.members.cache.filter((m) => m.presence.status === "offline" && !m.user.bot).size} miembros (sin conexión)`
    },

    support: {
        content: () => `:information_source: Si tiene alguna pregunta o necesita más información, puede unirse a DeltaBot Inc. :\n${discord}`
    },

    addbonus: {
        errors: {
            bonus: {
                missing: (prefix) => `${emojis.error} | Debes escribir la cantidad de invitaciones de bonificación que deseas agregar. (Sintaxis : ${prefix}addbonus número @miembro)`,
                incorrect: (prefix) => `${emojis.error} | Debes escribir un número __**válido**__ de invitaciones de bonificación que quieras agregar. (Sintaxis : ${prefix}addbonus número @miembro)`
            },
            member: {
                missing: (prefix) => `${emojis.error} | Debe mencionar al miembro al que desea agregar las invitaciones de bonificación. (Sintaxis : ${prefix}addbonus número @miembro)`
            }
        },
        title: () => `📥 Se agregaron invitaciones adicionales`,
        field: (prefix, member) => `Escribir \`${prefix}invites ${member.user.tag}\` para ver el nuevo número de invitaciones de **${member.user.username}** !`
    },

    removebonus: {
        errors: {
            bonus: {
                missing: (prefix) => `${emojis.error} | Debes indicar el número de invitaciones de bonificación que deseas retirar. (Sintaxis : ${prefix}removebonus número @miembro)`,
                incorrect: (prefix) => `${emojis.error} | Debes escribir un número __**válido**__ de invitaciones de bonificación que deseas eliminar. (Sintaxis : ${prefix}removebonus número @miembro)`
            },
            member: {
                missing: (prefix) => `${emojis.error} | Debe mencionar al miembro del que desea eliminar las invitaciones de bonificación. (Sintaxis : ${prefix}removebonus número @miembro)`
            }
        },
        title: () => `📥 Invitations Bonificación retirada`,
        field: (prefix, member) => `Escribir \`${prefix}invites ${member.user.tag}\` para ver el nuevo número de invitaciones de **${member.user.username}** !`
    },

    setdmjoin: {
        on: () => `**${emojis.success} | El sistema de mensajes de llegada en mp ahora está __ACTIVADO__ !**`,
        off: () => `**${emojis.success} | El sistema de mensajes de llegada en mp ahora está __DISACTIVADO__ !**`
    },

    setjoin: {
        on: () => `**${emojis.success} | El sistema de mensajes de llegada ahora está __ACTIVADO__ !**`,
        off: () => `**${emojis.success} | El sistema de mensajes de llegada ahora está __DISACTIVADO__ !**`
    },

    setleave: {
        on: () => `**${emojis.success} | El sistema de mensajes de salida ahora está __ACTIVADO__ !**`,
        off: () => `**${emojis.success} | El sistema de mensajes de salida ahora está __DISACTIVADO__ !**`
    },

    setprefix: {
        missing: () => `${emojis.error} | Debes escribir un prefijo !`,
        success: () => `${emojis.success} | El prefijo del servidor se ha actualizado !`
    },

    testdmjoin: {
        title: () => `:wrench: Sistema de mensajes de llegada en PM :`,
        description: () => `Si eso no funciona, verifique los permisos del bot o únase a nuestro [servidor de soporte](${discord})`,
        fields: {
            enabled: () => `> Habilitado:`,
            message: () => `> Mensaje:`
        },
        enabled: (prefix) => `${emojis.success} Mensajes de llegada en mp activados. Desactivarlos con \`${prefix}setdmjoin\`.`,
        disabled: (prefix) =>  `${emojis.error} Mensajes de llegada en mp desactivados. Activarlos con \`${prefix}setdmjoin\`.`,
        notDefineds: {
            message: (prefix) => `Ningún mensaje definido. Defínalo con \`${prefix}configdm\`!`
        }
    },

    testjoin: {
        title: () => `:wrench: Sistema de mensajes de llegadas :`,
        description: () => `Si eso no funciona, verifique los permisos del bot o únase a nuestro [servidor de soporte](${discord})`,
        fields: {
            enabled: () => `> Habilitado:`,
            channel: () => `> Sala:`,
            message: () => `> Mensaje:`
        },
        enabled: (prefix) => `${emojis.success} Mensajes de llegada activados. Desactivarlos con \`${prefix}setjoin\`.`,
        disabled: (prefix) =>  `${emojis.error} Mensajes de llegadas desactivados. Actívalos con \`${prefix}setjoin\`.`,
        notDefineds: {
            message: (prefix) => `Ningún mensaje definido. Defínalo con \`${prefix}configjoin\`!`,
            channel: (prefix) => `Sin salón definido. Defínalo con \`${prefix}configjoin\`!`
        }
    },

    testleave: {
        title: () => `:wrench: Sistema de mensajes de salida :`,
        description: () => `Si eso no funciona, verifique los permisos del bot o únase a nuestro [servidor de soporte](${discord})`,
        fields: {
            enabled: () => `> Habilitado:`,
            channel: () => `> Sala:`,
            message: () => `> Mensaje:`
        },
        enabled: (prefix) => `${emojis.success} Mensajes de salida activados. Desactivarlos con \`${prefix}setleave\`.`,
        disabled: (prefix) =>  `${emojis.error} Mensajes de salida desactivados. Actívalos con \`${prefix}setleave\`.`,
        notDefineds: {
            message: (prefix) => `Ningún mensaje definido. Defínalo con \`${prefix}configleave\`!`,
            channel: (prefix) => `Sin salón definido. Defínalo con \`${prefix}configleave\`!`
        }
    },

    config: {
        title: (guildName) => `Configuración de ${guildName}`,
        join: {
            title: (enabled) => `${(enabled ? emojis.success : emojis.error)} Mensajes de llegada`,
            content: (guild, data) => `
            > Habilitado: ${data.guild.join.enabled ? "**si**" : "**no**"}
            > Mensaje: ${data.guild.join.message ? "**definido**" : "**no definido**."}
            > salón: ${!data.guild.join.channel ? "**no definido**" : (guild.channels.cache.get(data.guild.join.channel) ? "**definido**" : "**salón no encontrado**")}`
        },
        leave: {
            title: (enabled) => `${(enabled ? emojis.success : emojis.error)} Mensajes de salida`,
            content: (guild, data) => `
            > Habilitado: ${data.guild.leave.enabled ? "**si**" : "**no**"}
            > Mensaje: ${data.guild.leave.message ? "**definido**" : "**no definido**."}
            > salón: ${!data.guild.leave.channel ? "**no definido**" : (guild.channels.cache.get(data.guild.leave.channel) ? "**definido**" : "**salón no encontrado**")}`
        },
        joinDM: {
            title: (enabled) => `${(enabled ? emojis.success : emojis.error)} Mensajes de llegada en PM`,
            content: (guild, data) => `
            > Habilitado: ${data.guild.joinDM.enabled ? "**si**" : "**no**"}
            > Mensaje: ${data.guild.joinDM.message ? "**definido**" : "**no definido**."}`
        },
    },

    joinDM: {
        premium: (username) => `:crown: | Oye, **${username}** ! Esta función solo está disponible para servidores y socios premium. Conviértete en premium aquí: **Comming soon** !`
    },

    configdmjoin: {
        disable: (prefix) => `Tipo \`${prefix}setdmjoin\` para deshabilitar los mensajes de llegada en mp.`,
        instruct: (str) => `
__**Plus d'informations**__
\`\`\`
{user}: menciona al miembro que acaba de unirse a tu servidor.
{user.name}: el apodo del miembro que acaba de unirse a su servidor.
{user.tag}: la etiqueta del miembro que acaba de unirse a su servidor.
{user.createdat}: la edad de la cuenta del miembro.

{guild}: nombre del servidor.
{guild.count}: número de miembros que tiene ahora su servidor.

{inviter}: menciona al invitado.
{inviter.name}: el nombre del invitado.
{inviter.tag}: la etiqueta del invitado.
{inviter.invites}: el número total de invitaciones para el invitado.

{invite.code}: el código de invitación utilizado.
{invite.url}: la URL de invitación utilizada.
{invite.uses}: número de veces que se utilizó el código de invitación.\`\`\`
Tipo \`cancel\` por cancelar. ${str}


:pencil: **| Ahora escriba el mensaje de llegada en PM... :pencil2:**`,
        cancelled: () => `${emojis.error} | Cancelado.`,
        success: () => `${emojis.success} **| Completado con éxito...**`,
        title: () => `**Se ha configurado el mensaje de llegadas de PM**`,
        fields: {
            message: () => `Mensaje:`,
            testIt: () => `Pruébalo:`,
            cmd: (prefix) => `Utilizar \`${prefix}testdmjoin\` para probar el nuevo mensaje.`
        },
    },

    configjoin: {
        disable: (prefix) => `Utilizar \`${prefix}setjoin\` para desactivar los mensajes de llegada.`,
        instructs: {
            message: (str) => `
__**Más información**__
\`\`\`
{user}: menciona al miembro que acaba de unirse a tu servidor.
{user.name}: el apodo del miembro que acaba de unirse a su servidor.
{user.tag}: la etiqueta del miembro que acaba de unirse a su servidor.
{user.createdat}: la edad de la cuenta del miembro.

{guild}: nombre del servidor.
{guild.count}: número de miembros que tiene ahora su servidor.

{inviter}: menciona al invitado.
{inviter.name}: el nombre del invitado.
{inviter.tag}: la etiqueta del invitado.
{inviter.invites}: el número total de invitaciones para el invitado.

{invite.code}: el código de invitación utilizado.
{invite.url}: la URL de invitación utilizada.
{invite.uses}: número de veces que se utilizó el código de invitación.\`\`\`
Tapez \`cancel\` pour annuler. ${str}


:pencil: **| Ahora escribe el mensaje de llegada... :pencil2:**`,
            channel: () => `:scroll: **| Ahora escriba el nombre de la salón en los mensajes de llegadas o menciónelo... :pencil2:**`
        },
        cancelled: () => `${emojis.error} | Cancelado.`,
        success: () => `${emojis.success} **| Completado con éxito...**`,
        title: () => `**Se ha configurado el mensaje de llegadas**`,
        fields: {
            message: () => `Mensaje:`,
            channel: () => `salón:`,
            testIt: () => `Pruébalo:`,
            cmd: (prefix) => `Utilizar \`${prefix}testjoin\` para probar el nuevo mensaje.`
        },
        errors: {
            channelNotFound: (channel) => `${emojis.error} | No se encontró espacio para \`${channel}\``
        }
    },

    configleave: {
        disable: (prefix) => `Utilizar \`${prefix}setleave\` para desactivar los mensajes salientes.`,
        instructs: {
            message: (str) => `
__**Más información**__
\`\`\`
{user}: menciona al miembro que acaba de dejar tu servidor.
{user.name}: el apodo del miembro que acaba de dejar su servidor.
{user.tag}: la etiqueta del miembro que acaba de dejar su servidor.
{user.createdat}: la edad de la cuenta del miembro.

{guild}: nombre del servidor.
{guild.invitercount}: número de miembros que tiene ahora su servidor.

{inviter}: menciona al invitado.
{inviter.name}: el nombre del invitado.
{inviter.tag}: la etiqueta del invitado.
{inviter.invites}: el número total de invitaciones para el invitado.

{invite.code}: el código de invitación utilizado.
{invite.url}: la URL de invitación utilizada.
{invite.uses}: número de veces que se utilizó el código de invitación.\`\`\`
Tipo \`cancel\` por cancelar. ${str}


:pencil: **| Ahora escribe el mensaje de salida... :pencil2:**`,
        channel: () => `:scroll: **| Ahora escriba el nombre de la sala en los mensajes de salida o menciónelo... :pencil2:**`
        },
        cancelled: () => `${emojis.error} | Cancelado.`,
        success: () => `${emojis.success} **| Hecho correctamente...**`,
        title: () => `**Se ha configurado el mensaje de salidas**`,
        fields: {
            message: () => `Mensaje:`,
            channel: () => `salón:`,
            testIt: () => `Pruébalo:`,
            cmd: (prefix) => `Utilizar \`${prefix}testleave\` para probar el nuevo mensaje.`
        },
        errors: {
            channelNotFound: (channel) => `${emojis.error} | No se encontró espacio para \`${channel}\``
        }
    },

    setlang: {
        invalid: () => `${emojis.error} | Debes ingresar un idioma válido !\n\n:flag_fr: Français (\`fr\`)\n:flag_gb: English (\`en\`)\n:flag_es: Spanish (\`es\`)\n:flag_pt: Português (\`pt\`)`,
        success: () => `${emojis.success} | :flag_es: El idioma del servidor ahora está en Español!`
    },

    addrank: {
        errors: {
            inviteCount: {
                missing: (prefix) => `${emojis.error} | Debes escribir el número de invitaciones necesarias para obtener el rango. (Sintaxis : ${prefix}addrank número @rol)`,
                incorrect: (prefix) => `${emojis.error} | Debes escribir un __ ** válido ** __ número de invitaciones necesarias para obtener el rango. (Sintaxis : ${prefix}addrank número @rol)`,
                alreadyExists: (prefix, rank, role) => `${emojis.error} | Ya hay un rol definido para **${rank.inviteCount}** invitaciones (\`@${role.name}\`) ! Eliminarlo con \`${prefix}removerank ${role.id}\` vuelva a intentarlo !`
            },
            role: {
                missing: (prefix) => `${emojis.error} | Debe mencionar el rol que desea agregar cuando se alcance la cuota de invitación. (Sintaxis : ${prefix}addrank número @rol)`,
                alreadyExists: (prefix, rank, role) => `${emojis.error} | Este rol ya se usa como recompensa por **${rank.inviteCount}** invitaciones ! Eliminarlo con \`${prefix}removerank ${role.id}\` puis réessayez !`,
                perm: (role) => `${emojis.error} | Mi rol no es lo suficientemente alto para agregar el rol \`@${role.name}\` a los miembros! Por favor reúna mi rol y vuelva a intentarlo !`
            }
        },
        title: () => `🎯 Nuevo rol agregado`,
        field: (prefix, role, inviteCount) => `Cuando un miembro alcanza el **${inviteCount}** invitaciones, recibirá el papel \`@${role.name}\` !`
    },

    removerank: {
        errors: {
            role: {
                missing: (prefix) => `${emojis.error} | Debes mencionar el rol que deseas eliminar.. (Sintaxis : ${prefix}removerank @rol)`,
                doesntExist: () => `${emojis.error} | Este rol no se usa para recompensas !`
            }
        },
        title: () => `🎯 Rol retirado`,
        field: (prefix, role, inviteCount) => `Rol eliminado de las recompensas. Los miembros ya no lo recibirán cuando lleguen al **${inviteCount}** invitaciones.`
    },

    ranks: {
        no: {
            title: () => `🎯 Sin rol`,
            description: (prefix) => `Para agregar una función de recompensa (agregada cuando un miembro alcanza un cierto número de invitaciones), escriba \`${prefix}addrank nombre @rol\` !`
        },
        title: () => `🎯 Recompensar roles`,
        formatRank: (rank, inviteCount) => `${rank} (**${inviteCount}** invitacións)\n`,
        description: () => `Aquí están las recompensas de la invitación`
    },

    website: {
        doc: {
            variables: () => `https://delta-bot.com/v/francais/configuration/variables`
        },
        utils: {
            members: () => `miembros`
        },
        conf: {
            title: () => `Configuración`
        },
        selector: {
            title: () => `Selector`,
            manage: () => `Gestionar`,
            no: {
                title: () => `Sin servidor`,
                content: () => `No se encontró servidor. Verifique que haya iniciado sesión con la cuenta correcta !`
            }
        },
        help: {
            title: () => `Ayuda`,
            doc: () => `Documentación`,
            support: () => `Servidor de soporte`
        },
        ranks: {
            title: () => `🎯 Rol de recompensas`,
            no: (prefix) => `No se define ningún rol de recompensa. Puedes configurarlos con los siguientes comandos : ${prefix}addrank, ${prefix}removerank et ${prefix}ranks.`,
            fields: {
                role: () => `Rol`,
                invites: () => `Invitaciones`
            }
        },
        forms: {
            buttons: {
                enable: () => `Activar mensajes`,
                disable: () => `Deshabilitar mensajes`,
                update: () => `Actualizar mensajes`
            },
            basic: {
                title: () => `⚙️ Configuracion basica`,
                language: () => `Lengua`,
                prefix: () => `Prefijo`,
                update: () => `Mettre à jour`
            },
            join: {
                title: () => `🏁 Messages d'arrivées`,
                message: {
                    title: () => `Message`,
                    default: () => `{user} a rejoint le serveur ! Il a été invité par **{inviter.tag}** (qui a **{inviter.invites}** invitations).`
                },
                channel: {
                    title: () => `Salon`
                }
            },
            leave: {
                title: () => `🛫 Messages de départs`,
                message: {
                    title: () => `Message`,
                    default: () => `{user.username} a quitté le serveur. Il avait été invité par **{inviter.tag}** (qui a **{inviter.invites}** invitations).`
                },
                channel: {
                    title: () => `Salon`
                }
            },
            joinDM: {
                title: () => `🔔 Messages d'arrivées en MP`,
                premium: () => `Fonctionnalité disponible pour les serveurs premium et les partenaires.`,
                message: {
                    title: () => `Message`,
                    default: () => `Bienvenue {user} sur **{server} ! Tu as été invité par **{inviter.tag}**. N'oublie pas d'aller lire les règles du serveur !`
                }
            }
        }
    },

    removeinvites: {
        loading: {
            all: (prefix) => `${emojis.loading} | Eliminar invitaciones del servidor actual... Puedes restaurarlos con el comando \`${prefix}restore-invites\` !`,
            member: (prefix, member) => `${emojis.loading} | Eliminación de invitaciones de **${member.user.tag}** en curso ... Puede restaurarlos usando el comando \`${prefix}restore-invites ${member.user.tag}\` !`
        },
        title: () => `☄️ Reinicio de invitaciones`,
        titles: {
            all: (prefix) => `${emojis.success} | ¡Las invitaciones al servidor se restablecen! Puedes restaurarlos con el comando \`${prefix}restore-invites\` !`,
            member: (prefix, member) => `${emojis.success} | Invitaciones **${member.user.tag}** reinicializado! Puedes restaurarlos con el comando \`${prefix}restore-invites ${member.user.tag}\` !`
        }
    },

    restoreinvites: {
        confirmations: {
            all: (prefix, memberCount) => `${emojis.warn} | ¿Está seguro de que desea restaurar las invitaciones del servidor? Todos los miembros recogerán las invitaciones que tenían antes de la última vez que se realizó el pedido. \`${prefix}remove-invites\` se ha escrito (o 0 si el comando nunca se ha escrito).\n\n:information_source: **Resumen de invitaciones**:\nSe restaurará, en total: **${memberCount.invites}** ordinario, **${memberCount.bonus}** bonificación, **${memberCount.leaves}** ido, **${memberCount.fake}** falso.\n\n${emojis.success} Tipo \`-confirm\` por confirmar.\n${emojis.error} Tipo \`cancel\` por cancelar.`,
            member: (prefix, member) => `${emojis.warn} | ¿Seguro que desea restaurar las invitaciones de **${member.user.tag}** ? Recuperará las invitaciones que tenía antes de la última vez que el pedido \`${prefix}remove-invites\` se ha escrito (o 0 si el comando nunca se ha escrito).\n\n:information_source: **Resumen de invitaciones**:\nSerá restaurado: **${member.data.old_invites}** ordinario, **${member.data.old_bonus}** bonificación, **${member.data.old_leaves}** ido, **${member.data.old_fake}** falso.\n\n${emojis.success} Tipo \`-confirm\` por confirmar.\n${emojis.error} Tipo \`cancel\` por cancelar.`,
            cancelled: () => `${emojis.error} Cancelado.`
        },
        loading: {
            all: () => `${emojis.loading} | Restaurar invitaciones del servidor actual...`,
            member: (member) => `${emojis.loading} | Restauración de invitaciones de **${member.user.tag}** en curso...`
        },
        title: () => `☄️ Invitaciones restauradas`,
        titles: {
            all: () => `${emojis.success} | Se restauraron las invitaciones del servidor !`,
            member: (member) => `${emojis.success} | Invitaciones **${member.user.tag}** restaurado !`
        }
    },

    syncinvites: {
        no: () => `${emojis.error} | No hay invitación para sincronizar.`,
        confirmations: {
            all: (inviteCount) => `${emojis.warn} | ¿Estás seguro de que deseas sincronizar las invitaciones del servidor? ?\n\n:information_source: **Resumen de invitaciones**:\nSerá restaurado **${inviteCount}** invitaciones ordinarias.\n\n${emojis.success} Tipo \`-confirm\` por confirmar.\n${emojis.error} Tipo \`cancel\` por cancelar.`,
            cancelled: () => `${emojis.error} Cancelado.`
        },
        title: () => `☄️ Invitaciones sincronizadas`,
        titles: {
            all: () => `${emojis.success} | Invitaciones de servidor sincronizadas !`
        }
    },

    add: {
        content: (id) => `Puedes agregarme a tu servidor haciendo clic en [aquí](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=2146958847).`,
        requested: (username) => `Preguntar por ${username}`
    }

};
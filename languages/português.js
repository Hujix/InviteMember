const { emojis, discord } = require("../config");

module.exports = {

    locale: "pt_PT",

    utils: {
        prefix: (prefix) => `Olá! Obrigado por usar **${prefix}help** para ver todos os pedidos! Você pode me adicionar ao seu servidor com **${prefix}add**.`,
        viewConf: () => `[Veja a configuração no painel](https://delta-bot.com)`,
        conf: {
            title: () => `Veja a configuração no painel`,
            content: () => `[ou no painel](https://delta-bot.com)`
        },
        specialMessages: {
            join: {
                oauth2: (user) => `${user} entrou no servidor via OAuth.`,
                vanity: (user) => `${user} entrou no servidor usando um convite discord.gg definido pelo proprietário do servidor (ou um administrador).`,
                unknown: (user) => `Não consigo descobrir como ${user} entrou no servidor.`,
                perm: (user) => `${emojis.error} | Preciso ter permissões para gerenciar o servidor para saber quem convidou ${user}.`
            },
            leave: {
                oauth2: (user) => `${user} deixou o servidor ao qual ele se juntou OAuth.`,
                vanity: (user) => `${user} saiu do servidor ao qual se juntou usando um convite discord.gg definido pelo proprietário do servidor (ou um administrador).`,
                unknown: (user) => `${user} saiu do servidor, mas não consigo descobrir como ele se juntou a ele.`
            }
        }
    },

    errors: {
        missingPerms: (neededPermissions) => `__**${emojis.error} Permissões ausentes**__\n\nEu preciso das seguintes permissões para este comando funcionar corretamente: ${neededPermissions.map((p) => "`"+p+"`").join(", ")}`,
        disabled: () => `${emojis.error} | Este comando está atualmente desativado !`,
        permLevel: (name) => `${emojis.error} | Este comando requer o nível de autorização : \`${name}\`!`,
        sendPerm: () => `${emojis.error} | Eu não tenho permissão para enviar mensagens nesta sala !`
    },

    help: {
        title: () => `ℹ Página de ajuda do InviteMember`,
        description: (guildName, prefix) => `● Prefixo em **${guildName}** : \`${prefix}\` (\`${prefix}setprefix\`)\n● Idioma em **${guildName}** : \`Português\` (\`${prefix}setlang\`)`,
        // Admin
        admin: {
            title: () => `<:delta_administration:739611028593049702> Comandos de administração`,
            content: (prefix) => "`"+ prefix +"addbonus`,`"+ prefix +"removebonus`,`"+ prefix +"sync-invites`,`"+ prefix +"removeinvites`,`"+ prefix +"restoreinvites`"},
        // Ranks
        ranks: {
            title: () => `:gift: Pedidos de recompensa`,
            content: (prefix) => "`"+ prefix +"addrank`,`"+ prefix +"removerank`,`"+ prefix +"ranks`"},
        // Join DM Messages
        joinDM: {
            title: () => `:envelope_with_arrow: Mensagens de chegada na PM`,
            content: (prefix) => "`"+ prefix +"configdm`,`"+ prefix +"setdm`,`"+ prefix +"testdm`"},
        // Join Messages
        join: {
            title: () => `:incoming_envelope: Mensagens de chegada`,
            content: (prefix) => "`"+ prefix +"configjoin`,`"+ prefix +"setjoin`,`"+ prefix +"testjoin`"},
        // Leave Messages
        leave: {
            title: () => `:envelope: Messages de départs`,
            content: (prefix) => "`"+ prefix +"configleave`,`"+ prefix +"setleave`,`"+ prefix +"testleave`"},
        // Invites
        invites: {
            title: () => `:wave: Convites`,
            content: (prefix) => "`"+ prefix +"invite`,`"+ prefix +"leaderboard`"},
        // ManageInvite
        manageInvite: {
            title: () => `:boom: InviteMember`,
            content: (prefix) => "`"+ prefix +"membercount`,`"+ prefix +"userinfo`,`"+ prefix +"botinfos`,`"+ prefix +"ping`,`"+ prefix +"partners`,`"+ prefix +"creators`,`"+ prefix +"support`,`"+ prefix +"add`"},
        // Others
        tip: (prefix) => `Dica: você pode ver sua configuração com o comando ${prefix}config`,
        links: (clientID) => `[Me adicione](https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=bot) ● [SiteWeb](https://delta-bot.com) ● [Servidor de suporte](${discord}) ● [Vote em mim](https://discord.boats/bot/${clientID}/vote) ● [Twitter](https://twitter.com/DeltaBotInc)`
    },

    botinfos: {
        author: (username) => `Estatisticas ${username}`,
        // Statistics
        statistics: {
            title: () => `📊 Estatisticas`,
            content: (guilds, users, channels) => `\`Servidores: ${guilds}\`\n\`Canal: ${channels}\`\n\`Membros: ${users}\``
        },
        // Versions
        versions: {
            title: () => `⚙️ Versões`,
            content: (djs, node) => `\`Discord: v${djs}\`\n\`Node: ${node}\``
        },
        // Shard
        shard: {
            title: (shardID, current) => `${emojis.online} Shard #${shardID} ${current ? `(atual)` : ""}`,
            content: (guilds, ping, ram) => `
            \`${guilds}\` Servidores
            \`${ping}\` ms
            \`${ram}\` mb ram`
        }
    },

    invite: {
        description: (member, memberData, isYou, nextRank, role) => `${isYou ? `Você tem` : `**${member.user.username}** em`} **${memberData.invites + memberData.bonus - memberData.leaves - memberData.fake}** convites! (**${memberData.invites}** comum, **${memberData.bonus}** bônus, **${memberData.fake > 0 ? `-${memberData.fake}` : `${memberData.fake}`}** falso, **${memberData.leaves > 0 ? `-${memberData.leaves}` : `${memberData.leaves}`}** foi)${nextRank ? `\nVocê ainda precisa **${nextRank.inviteCount - (memberData.invites + memberData.bonus - memberData.leaves - memberData.fake)}** convites para alcançar a classificação **${role}** !` : ""}`
    },

    leaderboard: {
        cleared: () => `${emojis.success} | Avaliação excluída !`,
        user: (user, member, lb) => `${lb} **${user.username}** - **${member.calculatedInvites}** convites (**${member.invites}** comum, **${member.bonus}** bônus, **${member.fake > 0 ? `-${member.fake}` : `${member.fake}`}** falso, **${member.leaves > 0 ? `-${member.leaves}` : `${member.leaves}`}** foi)`,
        prompt: () => `{{user}}, que pagina voce quer ir? Escrever \`cancel\` ouro \`0\` cancelar.`,
        title: () => `Classificação de convites`,
        empty: {
            title: () => `😕 Nenhum convite encontrado`,
            content: () => `Comece a convidar pessoas e você aparecerá nesta página !`
        }
    },

    userinfo: {
        title: (user) => `Conta ${user.tag} (${user.id})`,
        fields: {
            // user
            createdAt: {
                title: () => `Criação`
            },
            bot: {
                title: () => `Robô`,
                content: (user) => user.bot ? "Sim" : "Não"
            },
            // member
            joinedAt: {
                title: () => `Chegada`
            },
            joinWay: {
                title: () => `Chegada graças a`,
                oauth: () => `Convite Oauth2 (via discordapp.com).`,
                vanity: () => `Convite personalizado configurado por um administrador.`,
                unknown: (user) => `Não foi possível determinar como ${user.username} se juntou ao servidor.`,
                invite: (user) => user.tag
            },
            invites: {
                title: () => `Convites`,
                content: (inviteData) => `**${inviteData.invites + inviteData.bonus - inviteData.leaves - inviteData.fake}** convites (**${inviteData.invites}** comum, **${inviteData.bonus}** bônus, **${inviteData.fake > 0 ? `-${inviteData.fake}` : `${inviteData.fake}`}** falso, **${inviteData.leaves > 0 ? `-${inviteData.leaves}` : `${inviteData.leaves}`}** foi)`
            },
            joinOrder: {
                title: () => `Ordem de chegada`,
                content: (previous, next, user) => `${previous ? `**${previous.tag}** > ` : ""}**${user.tag}**${next ? ` > **${next.tag}**` : ""}`
            }
        }
    },

    membercount: {
        title: (guildName) => `MemberCount de ${guildName}`,
        description: (guild) => `
        Um total de **${guild.members.cache.size}** membros (**${guild.members.cache.filter((m) => !m.user.bot).size}** humanos e **${guild.members.cache.filter((m) => m.user.bot).size}** bots)

        ➔ ${emojis.dnd} | ${guild.members.cache.filter((m) => m.presence.status === "dnd"  && !m.user.bot).size} membros (não perturbe)
        ➔ ${emojis.online} | ${guild.members.cache.filter((m) => m.presence.status === "online" && !m.user.bot).size} membros (online)
        ➔ ${emojis.idle} | ${guild.members.cache.filter((m) => m.presence.status === "idle" && !m.user.bot).size} membros (afk)
        ➔ ${emojis.offline} | ${guild.members.cache.filter((m) => m.presence.status === "offline" && !m.user.bot).size} membros (offline)`
    },

    support: {
        content: () => `:information_source: Se você tiver alguma dúvida ou precisar de mais informações, pode ingressar na DeltaBot Inc. :\n${discord}`
    },

    addbonus: {
        errors: {
            bonus: {
                missing: (prefix) => `${emojis.error} | Você deve escrever o número de convites de bônus que deseja adicionar. (Sintaxe : ${prefix}addbonus número @member)`,
                incorrect: (prefix) => `${emojis.error} | Você deve escrever um número __**válido**__ de convites de bônus que você deseja adicionar. (Sintaxe : ${prefix}addbonus número @member)`
            },
            member: {
                missing: (prefix) => `${emojis.error} | Você deve mencionar o número ao qual deseja adicionar os convites de bônus. (Sintaxe : ${prefix}addbonus número @member)`
            }
        },
        title: () => `📥 Convites de bônus adicionados`,
        field: (prefix, member) => `Escrever \`${prefix}invites ${member.user.tag}\` para ver o novo número de convites de **${member.user.username}** !`
    },

    removebonus: {
        errors: {
            bonus: {
                missing: (prefix) => `${emojis.error} | Você deve indicar o número de convites de bônus que deseja retirar. (Sintaxe : ${prefix}removebonus número @member)`,
                incorrect: (prefix) => `${emojis.error} | You must write a __**valid**__ number of bonus invites that you want to remove. (Sintaxe : ${prefix}removebonus número @member)`
            },
            member: {
                missing: (prefix) => `${emojis.error} | Você deve mencionar o membro de quem deseja remover convites de bônus. (Sintaxe : ${prefix}removebonus número @member)`
            }
        },
        title: () => `📥 Convites de bônus retirados`,
        field: (prefix, member) => `Escrever \`${prefix}invites ${member.user.tag}\` para ver o novo número de convites de **${member.user.username}** !`
    },

    setdmjoin: {
        on: () => `**${emojis.success} | O sistema de mensagens de chegada em mp agora é __ACTIVADO__ !**`,
        off: () => `**${emojis.success} | O sistema de mensagens de chegada em mp agora é __DESATIVADO__ !**`
    },

    setjoin: {
        on: () => `**${emojis.success} | O sistema de mensagem de chegada é agora __ACTIVADO__ !**`,
        off: () => `**${emojis.success} | O sistema de mensagem de chegada é agora __DESATIVADO__ !**`
    },

    setleave: {
        on: () => `**${emojis.success} | O sistema de mensagem de partida agora é __ACTIVADO__ !**`,
        off: () => `**${emojis.success} | O sistema de mensagem de partida agora é __DESATIVADO__ !**`
    },

    setprefix: {
        missing: () => `${emojis.error} | Você deve escrever um prefixo !`,
        success: () => `${emojis.success} | O prefixo do servidor foi atualizado !`
    },

    testdmjoin: {
        title: () => `:wrench: Sistema de mensagens de chegada em PM :`,
        description: () => `Se isso não funcionar, verifique as permissões do bot ou junte-se ao nosso [servidor de suporte](${discord})`,
        fields: {
            enabled: () => `> Ativado:`,
            message: () => `> Mensagem:`
        },
        enabled: (prefix) => `${emojis.success} Mensagens de chegada em mp ativadas. Desative-os com \`${prefix}setdmjoin\`.`,
        disabled: (prefix) =>  `${emojis.error} Mensagens de chegada em mp desativadas Ative-as com \`${prefix}setdmjoin\`.`,
        notDefineds: {
            message: (prefix) => `Nenhuma mensagem definida. Defina com \`${prefix}configdm\`!`
        }
    },

    testjoin: {
        title: () => `:wrench: Sistema de mensagens de chegadas :`,
        description: () => `Se isso não funcionar, verifique as permissões do bot ou junte-se ao nosso [servidor de suporte](${discord})`,
        fields: {
            enabled: () => `> Ativado:`,
            channel: () => `> Canal:`,
            message: () => `> Mensagem:`
        },
        enabled: (prefix) => `${emojis.success} Mensagens de chegada ativadas. Desative-os com \`${prefix}setjoin\`.`,
        disabled: (prefix) =>  `${emojis.error} Mensagens de chegadas desativadas. Ative-os com \`${prefix}setjoin\`.`,
        notDefineds: {
            message: (prefix) => `Nenhuma mensagem definida. Defina com \`${prefix}configjoin\`!`,
            channel: (prefix) => `Nenhum salão definido. Defina com \`${prefix}configjoin\`!`
        }
    },

    testleave: {
        title: () => `:wrench: Sistema de mensagem de partida :`,
        description: () => `Se isso não funcionar, verifique as permissões do bot ou junte-se ao nosso [servidor de suporte](${discord})`,
        fields: {
            enabled: () => `> Ativado:`,
            channel: () => `> Canal:`,
            message: () => `> Mensagem:`
        },
        enabled: (prefix) => `${emojis.success} Mensagens de partida ativadas. Desative-os com \`${prefix}setleave\`.`,
        disabled: (prefix) =>  `${emojis.error} Mensagens de partida desativadas. Ative-os com \`${prefix}setleave\`.`,
        notDefineds: {
            message: (prefix) => `Nenhuma mensagem definida. Defina com \`${prefix}configleave\`!`,
            channel: (prefix) => `Nenhum salão definido. Defina com \`${prefix}configleave\`!`
        }
    },

    config: {
        title: (guildName) => `Configuração de ${guildName}`,
        join: {
            title: (enabled) => `${(enabled ? emojis.success : emojis.error)} Mensagens de chegada`,
            content: (guild, data) => `
            > Ativado: ${data.guild.join.enabled ? "**sim**" : "**não**"}
            > Mensagem: ${data.guild.join.message ? "**definiram**" : "**Indefinido**."}
            > Salão: ${!data.guild.join.channel ? "**Indefinido**" : (guild.channels.cache.get(data.guild.join.channel) ? "**definiram**" : "**salão não encontrado**")}`
        },
        leave: {
            title: (enabled) => `${(enabled ? emojis.success : emojis.error)} Mensagens de partida`,
            content: (guild, data) => `
            > Ativado: ${data.guild.leave.enabled ? "**sim**" : "**não**"}
            > Mensagem: ${data.guild.leave.message ? "**definiram**" : "**Indefinido**."}
            > Salão: ${!data.guild.leave.channel ? "**Indefinido**" : (guild.channels.cache.get(data.guild.leave.channel) ? "**definiram**" : "**salão não encontrado**")}`
        },
        joinDM: {
            title: (enabled) => `${(enabled ? emojis.success : emojis.error)} Mensagens de chegada na PM`,
            content: (guild, data) => `
            > Ativado: ${data.guild.joinDM.enabled ? "**sim**" : "**não**"}
            > Mensagem: ${data.guild.joinDM.message ? "**definiram**" : "**Indefinido**."}`
        },
    },

    joinDM: {
        premium: (username) => `:crown: | Hey, **${username}** ! Este recurso está disponível apenas para servidores premium e parceiros. Torne-se premium aqui: **Comming soon** !`
    },

    configdmjoin: {
        disable: (prefix) => `Tipo \`${prefix}setdmjoin\` para desativar mensagens de chegada em mp.`,
        instruct: (str) => `
__**Mais Informações**__
\`\`\`
{user} : Mencione o membro que acabou de entrar no seu servidor.
{user.name} : O apelido do membro que acabou de entrar no seu servidor.
{user.tag} : A tag do membro que acabou de entrar no seu servidor.
{user.createdat} : A idade da conta do membro.

{guild} : Nome do servidor.
{guild.count} : Número de membros que seu servidor tem agora.

{inviter} : Mencione o convidado.
{inviter.name} : O nome do convidado.
{inviter.tag} : Tag do convidado.
{inviter.invites} : O número total de convites do convidado.

{invite.code} : O código de convite usado.
{invite.url} : O url do convite usado.
{invite.uses} : Número de usos do código de convite.
\`\`\`
Tipo \`cancel\` cancelar. ${str}


:pencil: **| Agora escreva a mensagem de chegada em MP... :pencil2:**`,
        cancelled: () => `${emojis.error} | Cancelado.`,
        success: () => `${emojis.success} **| Completado com sucesso...**`,
        title: () => `**A mensagem de chegada da PM foi configurada**`,
        fields: {
            message: () => `Mensagem:`,
            testIt: () => `Teste:`,
            cmd: (prefix) => `Usar \`${prefix}testdmjoin\` para testar a nova mensagem.`
        },
    },

    configjoin: {
        disable: (prefix) => `Usar \`${prefix}setjoin\` para desativar mensagens de chegada.`,
        instructs: {
            message: (str) => `
__**Mais Informações**__
\`\`\`
{user} : Mencione o membro que acabou de entrar no seu servidor.
{user.name} : O apelido do membro que acabou de entrar no seu servidor.
{user.tag} : A tag do membro que acabou de entrar no seu servidor.
{user.createdat} : A idade da conta do membro.

{guild} : Nome do servidor.
{guild.count} : Número de membros que seu servidor tem agora.

{inviter} : Mencione o convidado.
{inviter.name} : O nome do convidado.
{inviter.tag} : Tag do convidado.
{inviter.invites} : O número total de convites do convidado.

{invite.code} : O código de convite usado.
{invite.url} : O url do convite usado.
{invite.uses} : Número de usos do código de convite.
\`\`\`
Tipo \`cancel\` cancelar. ${str}


:pencil: **| Agora escreva a mensagem de chegada... :pencil2:**`,
            channel: () => `:scroll: **| Agora escreva o nome da sala nas mensagens de desembarque ou mencione-o... :pencil2:**`
        },
        cancelled: () => `${emojis.error} | Annulé.`,
        success: () => `${emojis.success} **| Réalisé avec succès...**`,
        title: () => `**Le Msg d'Arrivées a été mis en place**`,
        fields: {
            message: () => `Mensagem:`,
            channel: () => `Canal:`,
            testIt: () => `Teste:`,
            cmd: (prefix) => `Usar \`${prefix}testjoin\` para testar a nova mensagem.`
        },
        errors: {
            channelNotFound: (channel) => `${emojis.error} | Nenhuma sala encontrada para \`${channel}\``
        }
    },

    configleave: {
        disable: (prefix) => `Usar \`${prefix}setleave\` para desativar mensagens de partida.`,
        instructs: {
            message: (str) => `
__**Mais Informações**__
\`\`\`
{user} : Mencione o membro que acabou de entrar no seu servidor.
{user.name} : O apelido do membro que acabou de entrar no seu servidor.
{user.tag} : A tag do membro que acabou de entrar no seu servidor.
{user.createdat} : A idade da conta do membro.

{guild} : Nome do servidor.
{guild.count} : Número de membros que seu servidor tem agora.

{inviter} : Mencione o convidado.
{inviter.name} : O nome do convidado.
{inviter.tag} : Tag do convidado.
{inviter.invites} : O número total de convites do convidado.

{invite.code} : O código de convite usado.
{invite.url} : O url do convite usado.
{invite.uses} : Número de usos do código de convite.
\`\`\`
Tipo \`cancel\` cancelar. ${str}


:pencil: **| Agora escreva a mensagem de partida... :pencil2:**`,
        channel: () => `:scroll: **| Agora escreva o nome do lounge nas mensagens de embarque ou mencione-o... :pencil2:**`
        },
        cancelled: () => `${emojis.error} | Cancelado.`,
        success: () => `${emojis.success} **| Feito com sucesso...**`,
        title: () => `**A Msg de Partidas foi configurada**`,
        fields: {
            message: () => `Mensagem:`,
            channel: () => `Canal:`,
            testIt: () => `Teste:`,
            cmd: (prefix) => `Usar \`${prefix}testleave\` para testar a nova mensagem`
        },
        errors: {
            channelNotFound: (channel) => `${emojis.error} | Nenhuma sala encontrada para \`${channel}\``
        }
    },

    setlang: {
        invalid: () => `${emojis.error} | Você deve inserir um idioma válido !\n\n:flag_fr: Français (\`fr\`)\n:flag_gb: English (\`en\`)\n:flag_es: Spanish (\`es\`)\n:flag_pt: Português (\`pt\`)`,
        success: () => `${emojis.success} | :flag_pt: O idioma do servidor agora está em português!`
    },

    addrank: {
        errors: {
            inviteCount: {
                missing: (prefix) => `${emojis.error} | Você deve escrever o número de convites necessários para obter a classificação. (Sintaxe : ${prefix}addrank número @role)`,
                incorrect: (prefix) => `${emojis.error} | Você deve escrever um número __**válido**__ de convites necessários para obter a classificação. (Sintaxe : ${prefix}addrank número @role)`,
                alreadyExists: (prefix, rank, role) => `${emojis.error} | Já existe uma função definida para **${rank.inviteCount}** convites (\`@${role.name}\`) ! Remova com \`${prefix}removerank ${role.id}\` então tente novamente !`
            },
            role: {
                missing: (prefix) => `${emojis.error} | Você deve mencionar a função que deseja adicionar quando a cota de convite for atingida. (Sintaxe : ${prefix}addrank número @role)`,
                alreadyExists: (prefix, rank, role) => `${emojis.error} | Esta função já é usada como recompensa para **${rank.inviteCount}** convites! Remova com \`${prefix}removerank ${role.id}\` então tente novamente !`,
                perm: (role) => `${emojis.error} | Minha função não é alta o suficiente para adicionar a função \`@${role.name}\` para membros! Por favor, reúna minha função e tente novamente !`
            }
        },
        title: () => `🎯 Nova função adicionada`,
        field: (prefix, role, inviteCount) => `Quando um membro chega ao **${inviteCount}** convites, ele receberá a função \`@${role.name}\` !`
    },

    removerank: {
        errors: {
            role: {
                missing: (prefix) => `${emojis.error} | Você deve mencionar a função que deseja remover. (Sintaxe : ${prefix}removerank @role)`,
                doesntExist: () => `${emojis.error} | Esta função não é usada para recompensas !`
            }
        },
        title: () => `🎯 Função retirada`,
        field: (prefix, role, inviteCount) => `Função removida das recompensas. Os membros não receberão mais quando chegarem ao **${inviteCount}** convites.`
    },

    ranks: {
        no: {
            title: () => `🎯 Sem papel`,
            description: (prefix) => `Para adicionar uma função de recompensa (adicionada quando um membro atinge um certo número de convites), tipo \`${prefix}addrank número @role\` !`
        },
        title: () => `🎯 Papéis de recompensa`,
        formatRank: (rank, inviteCount) => `${rank} (**${inviteCount}** convites)\n`,
        description: () => `Aqui estão as recompensas do convite`
    },

    website: {
        doc: {
            variables: () => `https://delta-bot.com/v/francais/configuration/variables`
        },
        utils: {
            members: () => `membros`
        },
        conf: {
            title: () => `Configuração`
        },
        selector: {
            title: () => `Seletor`,
            manage: () => `Gerir`,
            no: {
                title: () => `Sem servidor`,
                content: () => `Nenhum servidor encontrado. Verifique se você está conectado com a conta correta !`
            }
        },
        help: {
            title: () => `Ajude`,
            doc: () => `Documentation`,
            support: () => `Serveur support`
        },
        ranks: {
            title: () => `🎯 Rôle récompenses`,
            no: (prefix) => `Aucun rôle récompense défini. Vous pouvez les configurer avec les commandes suivantes : ${prefix}addrank, ${prefix}removerank et ${prefix}ranks.`,
            fields: {
                role: () => `Rôle`,
                invites: () => `Invitations`
            }
        },
        forms: {
            buttons: {
                enable: () => `Activer les messages`,
                disable: () => `Désactiver les messages`,
                update: () => `Mettre à jour les messages`
            },
            basic: {
                title: () => `⚙️ Configuration basique`,
                language: () => `Langue`,
                prefix: () => `Préfixe`,
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
            all: (prefix) => `${emojis.loading} | Excluindo convites do servidor atual ... Você pode restaurá-los com o comando \`${prefix}restore-invites\` !`,
            member: (prefix, member) => `${emojis.loading} | Remoção de convites de **${member.user.tag}** em andamento ... Você pode restaurá-los usando o comando \`${prefix}restore-invites ${member.user.tag}\` !`
        },
        title: () => `☄️ Convites redefinidos`,
        titles: {
            all: (prefix) => `${emojis.success} | Convites de servidor redefinidos! Você pode restaurá-los com o comando \`${prefix}restore-invites\` !`,
            member: (prefix, member) => `${emojis.success} | Convites **${member.user.tag}** reinicializado! Você pode restaurá-los com o comando \`${prefix}restore-invites ${member.user.tag}\` !`
        }
    },

    restoreinvites: {
        confirmations: {
            all: (prefix, memberCount) => `${emojis.warn} | Tem certeza de que deseja restaurar os convites do servidor? Todos os membros receberão todos os convites que receberam antes da última vez que o pedido foi feito. \`${prefix}remove-invites\` foi digitado (ou 0 se o comando nunca foi digitado).\n\n:information_source: **Visão geral de convites**:\nSerá restaurado, no total: **${memberCount.invites}** comum, **${memberCount.bonus}** bônus, **${memberCount.leaves}** foi, **${memberCount.fake}** falso.\n\n${emojis.success} Tipo \`-confirm\` confirmar.\n${emojis.error} Tipo \`cancel\` cancelar.`,
            member: (prefix, member) => `${emojis.warn} | Tem certeza que deseja restaurar os convites de **${member.user.tag}** ? Ele irá recuperar os convites que tinha antes da última vez que o pedido \`${prefix}remove-invites\` foi digitado (ou 0 se o comando nunca foi digitado).\n\n:information_source: **Visão geral de convites**:\nSerá restaurado: **${member.data.old_invites}** comum, **${member.data.old_bonus}** bônus, **${member.data.old_leaves}** foi, **${member.data.old_fake}** falso.\n\n${emojis.success} Tipo \`-confirm\` confirmar.\n${emojis.error} Tipo \`cancel\` cancelar.`,
            cancelled: () => `${emojis.error} Cancelado.`
        },
        loading: {
            all: () => `${emojis.loading} | Restaurando convites do servidor atual...`,
            member: (member) => `${emojis.loading} | Restauração de convites de **${member.user.tag}** em progresso...`
        },
        title: () => `☄️ Convites restaurados`,
        titles: {
            all: () => `${emojis.success} | Convites de servidor restaurados !`,
            member: (member) => `${emojis.success} | Convites **${member.user.tag}** restaurado !`
        }
    },

    syncinvites: {
        no: () => `${emojis.error} | Nenhum convite para sincronizar está disponível.`,
        confirmations: {
            all: (inviteCount) => `${emojis.warn} | Tem certeza que deseja sincronizar os convites do servidor ?\n\n:information_source: **Visão geral de convites**:\nSerá restaurado **${inviteCount}** convites comuns.\n\n${emojis.success} Tipo \`-confirm\` confirmar.\n${emojis.error} Tipo \`cancel\` cancelar.`,
            cancelled: () => `${emojis.error} Cancelado.`
        },
        title: () => `☄️ Convites sincronizados`,
        titles: {
            all: () => `${emojis.success} | Convites de servidor sincronizados !`
        }
    },

    add: {
        content: (id) => `Você pode me adicionar ao seu servidor clicando [aqui](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=2146958847).`,
        requested: (username) => `Pergunte por ${username}`
    }

};
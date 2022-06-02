'use strict'

const Proyecto = use('App/Models/Proyecto')
const Member = use('App/Models/Member')
const AutorizacionService = use('App/Services/AutorizacionService')

class MemberController {
    async index({ auth, request, params }) {
        const user = await auth.getUser()
        const { id } = params
        const proyecto = await Proyecto.find(id)
        AutorizacionService.verificarPermiso(proyecto, user)
        return await proyecto.members().fetch()
    }

    async create({ auth, request, params }) {
        const user = await auth.getUser()
        const { nombre, puesto } = request.all()
        const { id } = params
        const proyecto = await Proyecto.find(id)
        AutorizacionService.verificarPermiso(proyecto, user)
        const member = new Member()
        member.fill({
            nombre,
            puesto
        })
        await proyecto.members().save(member)
        return member
    }

    async update({ auth, params, request }) {
        const user = await auth.getUser()
        const { id } = params
        const member = await Member.find(id)
        const proyecto = await member.proyecto().fetch()
        AutorizacionService.verificarPermiso(proyecto, user)
        member.merge(request.only([
            'nombre',
            'puesto'
        ]))
        await member.save()
        return member
    }

    async destroy({ auth, params, request }) {
        const user = await auth.getUser()
        const { id } = params
        const member = await Member.find(id)
        const proyecto = await member.proyecto().fetch()
        AutorizacionService.verificarPermiso(proyecto, user)
        await member.delete()
        return member
    }
}

module.exports = MemberController
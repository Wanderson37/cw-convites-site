export function isValidCPF(cpf = '') {
  const str = cpf.replace(/\D/g, '')
  if (str.length !== 11 || /^(\d)\1{10}$/.test(str)) return false

  const calc = (t: number) => {
    let sum = 0
    for (let i = 0; i < t; i++) {
      sum += Number(str[i]) * (t + 1 - i)
    }
    const dig = (sum * 10) % 11
    return dig === 10 ? 0 : dig
  }

  return calc(9) === Number(str[9]) && calc(10) === Number(str[10])
}

export const cpfRule = (v: string) => !v || isValidCPF(v) || 'CPF inválido'

export const phoneRule = (v: string) => {
  const digits = (v || '').replace(/\D/g, '')
  return !v || digits.length === 10 || digits.length === 11 || 'Telefone deve ter 10 ou 11 dígitos'
}

export const dateRule = (v: string) => {
  if (!v) return true
  const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
  return regex.test(v) || 'Data inválida'
}

export const emailRule = (v: string) => {
  if (!v) return true
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(v) || 'E-mail inválido'
}

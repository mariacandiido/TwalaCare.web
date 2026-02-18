import { useState, type ChangeEvent } from "react"

interface Produto {
  id: string
  nome: string
  preco: number
  descricao: string
  imagem?: string
}

export default function FarmaciaPage() {
  const [lojaCriada, setLojaCriada] = useState(false)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [nomeLoja, setNomeLoja] = useState("")
  const [endereco, setEndereco] = useState("")
  const [telefone, setTelefone] = useState("")

  const [produtos, setProdutos] = useState<Produto[]>([])
  const [produtoAtual, setProdutoAtual] = useState<Produto>({
    id: "",
    nome: "",
    preco: 0,
    descricao: "",
    imagem: "",
  })

  const [editando, setEditando] = useState(false)

  // ---------------------------
  // Criar Produto
  // ---------------------------
  const adicionarProduto = () => {
    if (!produtoAtual.nome || !produtoAtual.preco) return

    if (editando) {
      setProdutos(produtos.map(p => p.id === produtoAtual.id ? produtoAtual : p))
      setEditando(false)
    } else {
      setProdutos([
        ...produtos,
        { ...produtoAtual, id: crypto.randomUUID() }
      ])
    }

    setProdutoAtual({
      id: "",
      nome: "",
      preco: 0,
      descricao: "",
      imagem: "",
    })
  }

  // ---------------------------
  // Editar Produto
  // ---------------------------
  const editarProduto = (produto: Produto) => {
    setProdutoAtual(produto)
    setEditando(true)
  }

  // ---------------------------
  // Deletar Produto
  // ---------------------------
  const deletarProduto = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id))
  }

  // ---------------------------
  // Upload de Imagem
  // ---------------------------
  const handleImagem = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setProdutoAtual({ ...produtoAtual, imagem: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  // ---------------------------
  // Finalizar Loja
  // ---------------------------
  const finalizarLoja = () => {
    if (!nomeLoja || produtos.length === 0) return

    // Aqui futuramente vai chamar API
    console.log({
      nomeLoja,
      endereco,
      telefone,
      produtos,
    })

    setLojaCriada(true)
  }

  // =====================================================
  // UI
  // =====================================================

  if (lojaCriada) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-green-600">
            Loja criada com sucesso 🎉
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      {!mostrarFormulario ? (
        <div className="flex justify-center">
          <button
            onClick={() => setMostrarFormulario(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Criar Loja
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">

          {/* ================= LOJA ================= */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Informações da Loja</h2>

            <input
              type="text"
              placeholder="Nome da Loja"
              className="w-full p-3 border rounded-lg"
              value={nomeLoja}
              onChange={e => setNomeLoja(e.target.value)}
            />

            <input
              type="text"
              placeholder="Endereço"
              className="w-full p-3 border rounded-lg"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
            />

            <input
              type="text"
              placeholder="Telefone"
              className="w-full p-3 border rounded-lg"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            />
          </div>

          {/* ================= PRODUTOS ================= */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Produtos</h2>

            <input
              type="text"
              placeholder="Nome do Produto"
              className="w-full p-3 border rounded-lg"
              value={produtoAtual.nome}
              onChange={e =>
                setProdutoAtual({ ...produtoAtual, nome: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Preço"
              className="w-full p-3 border rounded-lg"
              value={produtoAtual.preco}
              onChange={e =>
                setProdutoAtual({
                  ...produtoAtual,
                  preco: Number(e.target.value),
                })
              }
            />

            <textarea
              placeholder="Descrição"
              className="w-full p-3 border rounded-lg"
              value={produtoAtual.descricao}
              onChange={e =>
                setProdutoAtual({
                  ...produtoAtual,
                  descricao: e.target.value,
                })
              }
            />

            <input type="file" onChange={handleImagem} />

            {produtoAtual.imagem && (
              <img
                src={produtoAtual.imagem}
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}

            <button
              onClick={adicionarProduto}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {editando ? "Atualizar Produto" : "Adicionar Produto"}
            </button>

            {/* LISTA */}
            <div className="space-y-3 mt-6">
              {produtos.map(produto => (
                <div
                  key={produto.id}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{produto.nome}</p>
                    <p className="text-sm text-gray-500">
                      {produto.preco} Kz
                    </p>
                  </div>

                  <div className="space-x-2">
                    <button
                      onClick={() => editarProduto(produto)}
                      className="text-blue-600"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deletarProduto(produto.id)}
                      className="text-red-600"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= FINALIZAR ================= */}
          <div className="flex justify-end">
            <button
              onClick={finalizarLoja}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              OK, Loja criada
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

import { auth } from "@/auth"
import { AccountDropdown } from "@/components/account-dropdown"
import { Header } from "@/components/header"
import { Button } from "@nextui-org/button"
import { Avatar, Image, Input, Link } from "@nextui-org/react"
import { ArrowRight, Bell, Home, List, Search } from "lucide-react"

export default async function Index() {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen p-16">
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
      <div className="flex flex-col gap-8 w-full h-full py-8">
        <Header />
        <div className="flex flex-row gap-4 h-full">
          <div id="articles" className="flex flex-col gap-2 p-4 rounded-3xl border-[#ff7f00] border-2 w-[25%] h-full overflow-scroll">
            <div className="flex flex-row justify-between rounded-full border-[#ff7f00] border-2 p-1">
              <Search />
              <div className="flex flex-row items-center gap-2">
                <p>Visto recentemente</p>
                <List />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                className="uppercase bg-white border-[#ff7f00] border-2 w-full"
              >
                Artigos Científicos
              </Button>
              <Button
                className="uppercase bg-white border-[#ff7f00] border-2 w-full"
              >
                Pesquisas
              </Button>
              <Button
                className="uppercase bg-white border-[#ff7f00] border-2 w-full"
              >
                Discussões
              </Button>
            </div>

            {
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-row justify-center items-center gap-4 border-[#ff7f00] border-2 rounded-xl p-4">
                  <Avatar className="transition-transform w-16 h-16" src="https://github.com/lzbguts.png" />
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">
                      Impacto das Microalgas na Remoção de Poluentes em Sistemas Aquáticos
                    </p>
                    <p className="text-sm">
                      Artigo Científico - Prof. ABC de D
                    </p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="flex flex-col gap-8 p-4 rounded-3xl border-[#ff7f00] border-2 w-[50%] bg-[url('/microalgas.png')] bg-opacity-60">
            <div className="flex flex-col justify-center items-center p-4 rounded-xl gap-2 bg-gray-500/25">
              <p className="font-bold text-3xl text-center">Impacto das Microalgas na Remoção de Poluentes em Sistemas Aquáticos</p>
              <p className="font-bold text-2xl">Artigo Científico - Prof. ABC de D</p>
            </div>
            <div id="articles" className="flex flex-row p-4 rounded-xl gap-2 h-full bg-gray-500/25">
              <div className="w-11/12">
                <p className="font-bold text-2xl">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. In repellat expedita quam necessitatibus, atque accusantium tempora nisi id voluptatem voluptas molestiae perspiciatis consequuntur vero, eaque praesentium quaerat laudantium facere vel. Et architecto quia, totam perferendis iste error? Autem illum quae quaerat magni error tempore eaque eum quam sed eos dolorum placeat, accusantium consequatur. Minus, doloribus eligendi neque et hic soluta ea, temporibus iste quam commodi perspiciatis corrupti at quia aut! Sapiente, aliquid illum? Modi dolores ducimus dolorem sit quos tempora, nesciunt aperiam ipsam quas, pariatur ab deserunt vel recusandae fuga. Nobis repellat doloremque laborum. Ut quod at consectetur dignissimos cupiditate consequuntur minus vitae fugiat beatae aliquam iusto porro, iste obcaecati ab eligendi accusamus repudiandae. Similique fugit assumenda commodi ipsa sit enim iste dicta distinctio ratione reiciendis vel exercitationem placeat eos quae dolore iure, rerum autem tempore, ducimus sequi? Voluptatum voluptates facilis quia, ipsa voluptatem, doloremque fugit esse possimus, vero fugiat eos magni est nemo dolor. Nobis obcaecati sapiente expedita itaque voluptates sint, possimus dicta placeat numquam alias, veritatis saepe, esse necessitatibus. Quaerat qui, voluptatem aperiam blanditiis ut nulla labore dolorem, accusantium odio vitae officiis error ab! Et aperiam nihil corporis quod at obcaecati facilis. Laboriosam quibusdam velit exercitationem rem, neque beatae. Esse velit fugiat eaque hic molestiae explicabo eos recusandae! Magnam et, nihil ea fuga praesentium culpa sequi. Inventore quos aliquam quas amet tenetur. Facere provident blanditiis reiciendis possimus saepe porro at, eveniet dolores voluptas tenetur earum dolore perspiciatis commodi mollitia sunt, optio, natus unde adipisci? Quae hic, eligendi molestias aliquam eveniet veritatis architecto magni fuga maxime voluptatum facere sunt ab explicabo nulla aperiam doloribus voluptatibus laboriosam in odit ratione eius quas. Quae architecto iste voluptates tenetur soluta, nam, omnis, deserunt quod qui cumque vel sequi velit sint! Fugit ex amet voluptatum enim quo at. Natus earum odit perspiciatis eius necessitatibus quam officiis magnam inventore omnis nostrum. Voluptate voluptas quia ratione in voluptates doloremque illo, itaque animi soluta, officia veniam tempora alias eum reprehenderit dolorem incidunt quo suscipit ullam velit placeat? Illum voluptatum hic est culpa facilis dolore voluptatibus, minus non saepe, quam facere. Quis, velit id. Dignissimos quos recusandae beatae sequi modi voluptas maiores, vel in cupiditate, aperiam architecto sit. Ut ipsam esse nisi aut dolore ipsa exercitationem accusamus accusantium fugit sequi nobis vitae, non, vel obcaecati possimus ea facilis eum error! Nisi dolore, autem accusamus non cupiditate fugit veritatis expedita libero rem natus possimus quibusdam maxime dolorem similique voluptate corrupti et commodi sapiente? Aut ab quam perferendis reprehenderit ullam maxime vitae, quo repudiandae amet illo alias nostrum facilis laudantium dicta! Veniam veritatis molestias a ea dignissimos, illo dolorem obcaecati laboriosam soluta est sapiente sed harum incidunt magnam facilis exercitationem saepe vero earum id, eveniet deleniti rem eligendi architecto. Quas repudiandae ipsa maiores ab totam odit ex molestias mollitia. Quibusdam aut sequi, vel in aspernatur totam minus repudiandae ab, dicta suscipit laudantium. Vel maxime rerum corrupti eos nesciunt, odit vitae sunt laborum temporibus, id ipsum maiores, iste quo veniam dolor quam illo tempora optio non deserunt iusto quibusdam ut.
                </p>
              </div>
              <div className="w-1/12">
                <Link
                  href="/article/1"
                  className="flex flex-row justify-center items-center rounded-3xl p-4 text-black bg-white border-[#ff7f00] border-2 w-full"
                >
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>

          <div id="articles" className="flex flex-col gap-2 p-4 rounded-3xl border-[#ff7f00] border-2 w-[25%]">
            <div className="relative">
              <Image src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2021/10/dia-do-professor.jpg" alt="Professor" />
              <p className="font-bold text-3xl absolute left-2 top-2 z-10">Sobre o autor</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo natus iusto nulla perferendis deleniti delectus dolorum saepe quam vitae? Commodi impedit laboriosam nesciunt maxime, cupiditate debitis fuga consequuntur architecto possimus veritatis dolore unde ad similique neque error excepturi! Ratione eligendi quae doloribus dicta, voluptates a alias. Rerum dolores beatae quo deleniti saepe reprehenderit inventore consectetur quidem quasi, fugiat tempora numquam veniam corrupti illo at, facilis explicabo laborum, harum illum ipsa et. Eveniet facilis odit blanditiis ratione dolores labore, dolorum obcaecati culpa debitis aliquid totam facere earum deserunt numquam repellat explicabo dignissimos eum provident. Hic laboriosam eius autem dicta? Exercitationem, repellendus. Mollitia officiis fugit libero temporibus aliquid, tenetur quae dolore perspiciatis vel unde dolorem, ad magnam quo odit molestias alias atque porro omnis. Voluptates repellat, odit assumenda eaque a labore nemo cupiditate. Ratione fugit repudiandae, impedit nostrum quos nam alias aperiam voluptatibus ducimus excepturi totam, laborum asperiores possimus perspiciatis nobis dolore dignissimos aspernatur cumque quisquam, provident odit rerum cupiditate eaque perferendis! Eligendi vel, error voluptas natus illum sit ipsum doloribus dolor quos, harum repellat dignissimos quo amet nihil? Iste harum quia dolore ipsam magni quasi atque sequi quis dolores? Quas harum quasi blanditiis asperiores provident sunt dignissimos ipsa, quam, esse ab neque excepturi dolores perspiciatis ipsam quaerat facere doloribus distinctio expedita maxime quia laudantium, at necessitatibus! Libero fugiat cum dolor vero numquam ipsa, quibusdam dicta mollitia dolore, omnis velit necessitatibus unde odit dolorem ex, quod eius illo eum obcaecati sunt! Blanditiis ipsum, animi nam facilis maiores quam veritatis! Beatae sint fugit totam debitis, praesentium sed expedita vitae quo enim, asperiores consectetur? Repudiandae deserunt explicabo aliquid earum alias nemo molestias, minima modi quos rem fugit a asperiores, aspernatur expedita. Totam est reprehenderit praesentium provident consequatur, blanditiis eos quam unde veniam ut sit, expedita quis ad dolore modi non optio. Eum maxime quibusdam odio fugit laudantium in, numquam perferendis temporibus sequi animi eligendi ullam optio consequuntur ea ad. Aut vitae, rem iure quam ratione ea, sint, repudiandae eos unde ipsam iste velit? Tempora maxime voluptates reprehenderit odit. Dolorum molestiae quod iusto molestias veniam aperiam ipsam dolorem omnis debitis, amet ratione officiis non eius nesciunt, ad accusamus minima nostrum placeat laboriosam facilis in consequuntur, natus odit earum. Accusantium, libero nesciunt soluta officia ipsam minus quasi dignissimos accusamus fuga, officiis ad beatae provident at sunt sequi, obcaecati dicta eligendi nisi? Illo quaerat explicabo assumenda ipsam. Molestias quae facere enim possimus animi! Pariatur, harum debitis voluptatem necessitatibus maiores dignissimos quam amet consectetur saepe, molestiae repellendus ab asperiores maxime corporis enim beatae autem eligendi expedita numquam obcaecati aspernatur, ex magnam commodi? Praesentium non voluptas id accusamus, sapiente aspernatur totam. Accusamus animi ipsa eos nisi velit quaerat officia, aperiam quis, cumque saepe illum distinctio, natus sint. Nihil, reprehenderit? Optio, aliquid. Itaque excepturi quod, sapiente iusto maiores a distinctio beatae autem quibusdam officia molestiae amet tempora ex ea hic? Minus, reiciendis quidem error ad, inventore non vero, excepturi officia maxime enim libero repellat hic officiis quas quia aliquid! Architecto repellendus rem eius autem. Ipsum consectetur accusantium nam. Explicabo, suscipit!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#ff7f00] w-full h-[16px]"></div>
    </div>
  )
}

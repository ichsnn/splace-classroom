import { upload } from '@/utils/azure/storageBlob';
import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request) {
  const data = await req.formData();
  const content = data.get('content') as string;
  const type = data.get('type')as any;
  const tags = data.get('tags') as string;
  const attachments = data.getAll("attachments") as unknown as File[];
  if (!content) {
    return getResponse(400, 'Content is required');
  }
  if (["DRAFT", "PUBLISHED", "ARCHIVED"].includes(type) === false) {
		return getResponse(400, "Invalid type");
  }
    
  const user = await getSessionUser();
  let attachmentsPaths: string[] = [];
  if (attachments) {
    if (!Array.isArray(attachments)) {
      return getResponse(400, 'Attachments should be an array');
    }
    if (attachments.length > 5) {
      return getResponse(400, 'Maximum 5 attachments allowed');
    }
    const attacmentUploaded = await Promise.all(attachments.map(async (attachment: any) => {
      const bytes = await attachment.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const now = new Date();
      const prefixFile = `${now.toLocaleString()}`;
      return upload(
			"attachments",
			`${prefixFile} -${attachment.name}`,
			buffer
		);
    }) )
    attachmentsPaths = attacmentUploaded.map((attachment: any) => attachment.request.url);
  }
  const discustion = await prisma.discustions.create({
		data: {
			content,
			type,
			tags: tags ?  JSON.parse(tags) : [],
			attachments: attachmentsPaths || [],
			user: {
				connect: {
					id: user?.id,
				},
			},
		},
  });
  return getResponse(discustion, "Discustion created", 200);
}
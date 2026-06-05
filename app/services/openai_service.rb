require "bundler/setup"
require "openai"

class OpenaiService
  def initialize(judge_result)
    @judge_result = judge_result
  end

  def fetch_detail_action
    # イニシャライザで設定しているのでClient.newでOK
    openai = OpenAI::Client.new
    system_prompt = I18n.t('ai_templates.system_prompt')
    Rails.logger.info(system_prompt)

    chat_completion = openai.chat.completions.create(
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: @judge_result.to_json }
      ],
      temperature: 0.7,
      max_tokens: 150
    )

    chat_completion.choices[0].message.content
  end
end
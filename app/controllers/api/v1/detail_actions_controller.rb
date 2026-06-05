class Api::V1::DetailActionsController < ApplicationController
  # CSRFチェックをスキップ
  skip_before_action :verify_authenticity_token

  def create
    # Vueから送られてきたステータスをチェック
    # (FACE_STATUS_INDEX.NOT_DETECTED = 0 の場合はRails側でも念のため弾く)
    if params[:status] == 0
      render json: { advice: "人が写っていないため、アドバイスはありません。" } and return
    end

    # Serviceクラスを呼び出す
    # 外部APIを叩くロジックはすべてServiceの中に隠蔽される
    service = OpenaiService.new(params[:judge_result])
    advice_text = service.fetch_detail_action

    render json: { advice: advice_text }

  rescue => e
    logger.error "=========================================="
    logger.error "OpenAIエラー: #{e.message}（位置: #{e.backtrace[0]}）"
    logger.error "=========================================="
    render json: { error: "1アクション詳細説明の生成に失敗しました" }, status: :internal_server_error
  end
end
